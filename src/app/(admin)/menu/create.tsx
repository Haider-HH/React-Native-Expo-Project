import { View, Text, StyleSheet, TextInput, Image, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/src/components/Button';
import { defaultImage } from '@/src/components/ProductList';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useCreateProduct, useDeleteProduct, useProduct, useUpdateProduct } from '@/src/api/products';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/src/lib/supabase';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import RemoteImage from '@/src/components/RemoteImage';

const CreateProductScreen = () => {    
    const { id: idString } = useLocalSearchParams();
    const id = idString ? parseFloat(Array.isArray(idString) ? idString?.[0] : idString) : undefined;
    const isUpdating = !!id;

    const productQuery = useProduct(id as number);
    const { data: product, error: fetchingError, isLoading } = isUpdating ? productQuery : { data: null, error: null, isLoading: false };

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState(isUpdating ? "Update" : "Create");
    const [deleteButtonText, setDeleteButtonText] = useState("Delete");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate: createProduct } = useCreateProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();

    useEffect(() => {
        if (product) {
          setName(product.name);
          setPrice(product.price.toString());
          setImage(product.image);
        }
    }, [product]);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (fetchingError) {
        return (
            <>
                <Text>Failed to fetch product</Text>
                <Text>{fetchingError.message}</Text>
            </>
        );
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [4, 4],
        });
        if (!result.canceled) {
            const imagePath = await uploadImage(result.assets[0].uri);
            setImage(imagePath || defaultImage)
        }
    };

    const resetFields = () => {
        setImage(defaultImage);
        setName('');
        setPrice('');
    };

    const showNoImageAlert = () => {
        return new Promise((resolve) => {
            Alert.alert("Notice", "The product has no image", [
                {
                    text: 'cancel',
                    onPress: () => {
                        setError("Please Upload a Product Image");
                        resolve(false);
                    }
                },
                {
                    text: 'ignore',
                    onPress: () => resolve(true),
                }
            ]);
        });
    };

    const validateInput = async () => {
        setError('');
        if (image === defaultImage) {
            const proceed = await showNoImageAlert();
            if (!proceed) return false;
        }
        if (!name) {
            setError('Name is Required');
            return false;
        }
        if (!price) {
            setError("Price is Required");
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setError('Price is not a number');
            return false;
        }
        return true;
    };

    const onCreate = async () => {
        const isValid = await validateInput();
        if (!isValid) return;

        setButtonText("Creating...");
        setIsSubmitting(true);


        createProduct({ name, image , price: parseFloat(price) }, {
            onSuccess: () => {
                resetFields();
                router.back();
            },
            onSettled: () => {
                setButtonText("Create");
                setIsSubmitting(false);
            }
        });
    };

    const onUpdate = async () => {
        const isValid = await validateInput();
        if (!isValid) return;

        setButtonText("Updating...");
        setIsSubmitting(true);
        console.log(image);

        updateProduct({ name, image, price: parseFloat(price), id: id! }, {
            onSuccess: () => {
                resetFields();
                router.back();
            },
            onSettled: () => {
                setButtonText("Update");
                setIsSubmitting(false);
            }
        });
    };

    const onDelete = () => {
        setDeleteButtonText("Deleting...");
        setIsSubmitting(true);

        deleteProduct(id!, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            },
            onSettled: () => {
                setDeleteButtonText("Delete");
                setIsSubmitting(false);
            }
        });
    };

    const confirmDelete = () => {
        Alert.alert("Confirm", "Do you want to delete this product?", [
            {
                text: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ]);
    };

    const onSubmit = async () => {
        const isValid = await validateInput();
        if (!isValid) return;

        if (isUpdating) {
            await onUpdate();
        } else {
            await onCreate();
        }
    };

    const uploadImage = async (image: string | null) => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });

        console.log("Uploading Image Error: ", error);
        if (data) {
            return data.path;
        };
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: !isUpdating ? 'Create Product' : 'Update Product' }} />
            <RemoteImage
                path={image}
                fallback={defaultImage}
                style={styles.imageStyling}
            />
            <View style={[{ flexDirection: 'row', alignSelf: 'center' }]}>
                <Text onPress={pickImage} style={styles.imageSelection}>Select Image</Text>
                <Pressable onPress={() => {
                    setImage(defaultImage);
                    setName('');
                    setPrice('');
                }}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="trash"
                            size={25}
                            color={Colors.light.tint}
                            style={{ marginTop: 5, opacity: pressed ? 0.5 : 1, position: 'absolute', marginLeft: 50 }}
                        />
                    )}
                </Pressable>
                {isUpdating && <Pressable onPress={() => {
                    setImage(product?.image || defaultImage);
                    setName(product?.name ?? "");
                    setPrice(product?.price?.toString() ?? "");
                }}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="undo"
                            size={25}
                            color={Colors.light.tint}
                            style={{ marginTop: 5, opacity: pressed ? 0.5 : 1, position: 'absolute', marginLeft: 80 }}
                        />
                    )}
                </Pressable>}
            </View>
            <Text style={styles.label}>Name</Text>
            <TextInput
                placeholder={!isUpdating ? 'name' : product?.name}
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor={'#BDBDBD'}
            />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                placeholder={!isUpdating ? '9.99' : product?.price.toString()}
                style={styles.input}
                keyboardType='numeric'
                value={price}
                onChangeText={setPrice}
                placeholderTextColor={'#BDBDBD'}
            />
            <Text style={{ color: 'red' }}>{'\t' + error}</Text>
            <Button
                text={buttonText}
                onPress={onSubmit}
                disabled={isSubmitting}
            />
            {isUpdating && (
                <Button
                    text={deleteButtonText}
                    onPress={confirmDelete}
                    buttonColor="#D32F2F"
                    disabled={isSubmitting}
                />
            )}
        </View>
    );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    imageSelection: {
        alignSelf: 'center',
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    imageStyling: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
});
