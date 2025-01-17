import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const CartPage = () => {
  const user = { email: "test@example.com" }; // Replace with actual user email
  const navigate = useNavigate();

  // Fetch cart items for the logged-in user
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(cartItems);
  // Handle quantity increment
  const increaseQuantity = async (id) => {
    try {
      await axios.patch(`/cart/${id}`, { action: "increase" });
      refetch();
    } catch (error) {
      console.error("Error increasing quantity:", error.message);
    }
  };

  // Handle quantity decrement
  const decreaseQuantity = async (id) => {
    try {
      await axios.patch(`/cart/${id}`, { action: "decrease" });
      refetch();
    } catch (error) {
      console.error("Error decreasing quantity:", error.message);
    }
  };

  // Handle item removal
  const removeItem = async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      refetch();
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  // Clear all cart items
  const clearCart = async () => {
    try {
      await axios.delete(`/cart/clear?email=${user.email}`);
      refetch();
    } catch (error) {
      console.error("Error clearing cart:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Medicine Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">
                {item.medicine.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.medicine.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${item.medicine.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.medicine.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.buyer.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
