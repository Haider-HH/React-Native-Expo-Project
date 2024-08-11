import { Alert } from "react-native";
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
    const {data, error} = await supabase.functions.invoke('payment-sheet', {body: {amount}});

    if (data) {
        return data;
    }
    Alert.alert("Error", "Error Fetching Payment Sheet Params");
    return {};
}

export const initializePaymentSheet = async (amount: number) => {
    console.log('initializing payment sheet for: ', amount);
    const { paymentIntent, publishableKey} = await fetchPaymentSheetParams(amount);

    if (!paymentIntent || !publishableKey) {
        return;
    }
    await initPaymentSheet({
        merchantDisplayName: "PizzaOfSuffer",
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: "haider hasan"
        }
    })
};

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
        Alert.alert("Payment Sheet Error", error.message);
        return false
    }
    return true;
}