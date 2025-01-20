import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";

import PurchaseModal from "./PurchaseModal";

const CheckoutPage = () => {
  const { user } = useAuth();

  let [isOpen, setIsOpen] = useState(false);

  const {
    data: cartItems,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/cart?email=${user.email}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner message="Loading cart items..." />;
  if (isError)
    return <div>Error loading cart items. Please try again later.</div>;

  const totalQuantity = cartItems?.reduce(
    (total, item) => total + item?.buyQuantity,
    0
  );
  const totalPrice = cartItems
    ?.reduce(
      (total, item) => total + item?.medicine?.price * item?.buyQuantity,
      0
    )
    .toFixed(2);

  // Handle item removal
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`);
      refetch();
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  // Clear all cart items
  const clearCart = async () => {
    for (const item of cartItems) {
      await handleDelete(item?._id);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <div className="checkout-page">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {cartItems?.length === 0 ? (
          <div>Your cart is empty. Add items to proceed with checkout.</div>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Medicine Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">
                  Price/Piece
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item?.medicine?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item?.medicine?.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item?.buyQuantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ${item?.medicine?.price - item?.medicine?.offer}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    $
                    {(item?.medicine?.price - item?.medicine?.offer) *
                      item?.buyQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  className="border border-gray-300 px-4 py-2 text-center"
                  colSpan={2}
                >
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {totalQuantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  -
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-bold text-green-600">
                  ${totalPrice}
                </td>
              </tr>
            </tfoot>
          </table>
        )}

        <button
          className={`bg-first-color/90 text-white px-4 py-2 mt-4 rounded hover:bg-first-color ${
            cartItems.length === 0 && "cursor-not-allowed"
          }`}
          onClick={() => setIsOpen(true)}
          aria-label="Pay Now"
          disabled={cartItems.length === 0}
        >
          Pay Now
        </button>
      </div>

      {/* Modal */}

      <PurchaseModal
        totalPrice={totalPrice}
        closeModal={closeModal}
        isOpen={isOpen}
        refetch={refetch}
        cartItems={cartItems}
        clearCart={clearCart}
      />
    </Container>
  );
};

export default CheckoutPage;
