// CheckoutPage.jsx

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const { user } = useAuth(); // Replace with actual user email

  const [clientSecret, setClientSecret] = useState("");
  // Fetch cart items for the logged-in user
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/cart?email=${user.email}`
      );
      return data;
    },
  });

  console.log(cartItems);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.buyQuantity,
      0
    );
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <p>Grand Total: ${calculateTotal()}</p>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
