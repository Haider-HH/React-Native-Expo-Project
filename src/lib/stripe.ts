import { Alert } from "react-native";
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
    const { data, error } = await supabase.functions.invoke('payment-sheet', { body: { amount } });
    console.log("Supabase response:", { data, error });

    if (error || !data) {
        Alert.alert("Error", "Error Fetching Payment Sheet Params");
        return {};
    }
    return data;
};



export const initializePaymentSheet = async (amount: number) => {
    console.log('initializing payment sheet for: ', amount);
    const { paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(amount);

    if (!paymentIntent || !publishableKey) {
        console.error("Missing Payment Intent or Publishable Key");
        Alert.alert("Error", "Missing Payment Intent or Publishable Key");
        return false;
    }

    const { error } = await initPaymentSheet({
        merchantDisplayName: "PizzaOfSuffer",
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: "haider hasan",
        },
    });

    if (error) {
        console.error("Error initializing Payment Sheet:", error);
        Alert.alert("Error", "Error initializing Payment Sheet");
        return false;
    }

    return true;
};



export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
        Alert.alert("Payment Sheet Error", error.message);
        return false
    }
    else {
        Alert.alert("Success", "Your order is Confirmed")
        return true;
    };
}