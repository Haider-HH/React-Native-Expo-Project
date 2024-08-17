import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';
import { createOrRetrieveProfile } from '../_utils/supabase.ts';

console.log('Hello from Functions!');

serve(async (req: Request) => {
  try {
    const { amount } = await req.json();
    const customer = await createOrRetrieveProfile(req);  // Ensure this is a valid value
    console.log("Customer:", customer);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer},
      {apiVersion: "2024-06-20"}
    );
    console.log("Ephemeral Key:", ephemeralKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer,
    });
    console.log("Payment Intent:", paymentIntent);

    const res = {
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.log("Error in Supabase function:", error);
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
