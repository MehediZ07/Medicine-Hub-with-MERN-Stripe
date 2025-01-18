import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { Dialog, Transition } from "@headlessui/react";
import PurchaseModal from "./PurchaseModal";

const CheckoutPage = () => {
  const { user } = useAuth(); // Replace with actual user email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [cardDetails, setCardDetails] = useState("");

  let [isOpen, setIsOpen] = useState(false);

  // Fetch cart items for the logged-in user
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

  // Calculate total price and quantity
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

  // Handle form submission
  // const handlePaymentSubmit = (e) => {
  //   e.preventDefault();
  //   if (!address || !cardDetails) {
  //     alert("Please provide valid address and card details.");
  //     return;
  //   }
  //   console.log("Payment Details:", { address, cardDetails });
  //   closeModal();
  // };

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
                    ${item?.medicine?.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ${item?.medicine?.price * item?.buyQuantity}
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
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
          aria-label="Pay Now"
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
      />

      {/* <Transition appear show={isModalOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 shadow">
                <Dialog.Title className="text-lg font-medium text-center mb-4">
                  Payment Details
                </Dialog.Title>
                <form>
                  <label className="block text-gray-700 mb-2">
                    Address:
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your shipping address"
                      required
                    />
                  </label>
                  <label className="block text-gray-700 mb-2">
                    Card Details:
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      value={cardDetails}
                      onChange={(e) => setCardDetails(e.target.value)}
                      placeholder="Enter card details"
                      required
                    />
                  </label>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handlePaymentSubmit}
                    >
                      Pay ${totalPrice}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </Container>
  );
};

export default CheckoutPage;
