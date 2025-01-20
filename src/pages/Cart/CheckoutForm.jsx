import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({
  closeModal,
  refetch,
  totalPrice,
  cartItems,
  adress,
  clearCart,
}) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const [orderSummary, setOrderSummary] = useState([]);

  const handleStoreItems = () => {
    const summary = cartItems?.map((item) => ({
      customer: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
      medicineId: item?.medicine?._id,
      price:
        (item?.medicine?.price - item?.medicine?.offer) * item?.buyQuantity,
      quantity: item?.buyQuantity,
      seller: item?.medicine?.seller?.email,
      status: "Pending",
    }));

    setOrderSummary(summary);
  };

  useEffect(() => {
    handleStoreItems();
  }, [cartItems]);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        address: {
          city: adress.address || "",
          country: "US",
          line1: "",
          line2: "",
        },
        email: user?.email || "anonymous",
        name: user?.displayName || "anonymous",
        phone: "",
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        try {
          for (const order of orderSummary) {
            await axiosSecure.post("/order", {
              ...order,
              transactionId: paymentIntent?.id,
              address: adress.address,
            });
          }

          // Loop through cartItems and decrease quantity for each product
          for (const item of cartItems) {
            if (item?.medicine?._id && item?.buyQuantity) {
              const productId = item?.medicine?._id;
              const quantityToDecrease = item.buyQuantity;

              // Decrease quantity for the specific product
              await axiosSecure.patch(`/medicines/quantity/${productId}`, {
                quantityToUpdate: quantityToDecrease,
                status: "decrease",
              });
            }
          }

          toast.success("Order Successful!");
          clearCart();
          refetch();
          navigate(`/invoice/${paymentIntent.id}`);
        } catch (err) {
          console.log(err);
          setError("Error placing the order. Please try again.");
        } finally {
          setProcessing(false);
          closeModal();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn  bg-first-color/90 text-white my-4"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
