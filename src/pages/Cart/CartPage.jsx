import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import DeleteModal from "../../components/Modal/DeleteModal";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";

const CartPage = () => {
  const { user } = useAuth(); // Replace with actual user email
  const navigate = useNavigate();
  const [role] = useRole();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  // Fetch cart items for the logged-in user
  const {
    data: cartItems,
    isLoading,
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

  if (isLoading) return <LoadingSpinner />;

  // Calculate the total price
  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      return total + item?.medicine?.price * item?.buyQuantity;
    }, 0);
  };

  const increaseQuantity = async (id, stock, buyerQuentity) => {
    console.log(id, stock, buyerQuentity);
    if (stock <= buyerQuentity) {
      return toast.error(`Stock Limit Full`);
    }
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        action: "increase",
      });
      refetch();
    } catch (error) {
      console.error("Error increasing quantity:", error.message);
    }
  };

  // Handle quantity decrement
  const decreaseQuantity = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        action: "decrease",
      });
      refetch();
    } catch (error) {
      console.error("Error decreasing quantity:", error.message);
    }
  };

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

  return (
    <Container>
      {role === "customer" && (
        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="container mx-auto p-8">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Currently, you don't have any Medicine
              </h1>
              <div className="mt-8 w-fit mx-auto">
                <Link
                  to="/shop"
                  className="bg-first-color/80 text-white px-6 py-2 rounded-full shadow-md bg-first-color transition duration-300"
                >
                  Add Medicine First
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Cart</h1>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Medicine Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Category
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Abailable Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
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
                        ${item?.medicine?.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {item?.medicine?.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {item?.buyQuantity}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                          onClick={() =>
                            increaseQuantity(
                              item?._id,
                              item?.medicine?.quantity,
                              item?.buyQuantity
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className={`bg-red-500 text-white px-2 py-1 mr-2 rounded ${
                            item?.buyQuantity <= 1 && "hidden"
                          }`}
                          onClick={() => decreaseQuantity(item?._id)}
                          disabled={item?.buyQuantity <= 0}
                        >
                          -
                        </button>

                        <button
                          className={`bg-red-500 text-white px-2 py-1 mr-2 rounded ${
                            item?.buyQuantity > 1 && "hidden"
                          }`}
                          onClick={() => handleDelete(item?._id)}
                          disabled={item?.buyQuantity > 1}
                        >
                          -
                        </button>

                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                          onClick={() => setIsOpen(true)}
                        >
                          Remove
                        </button>
                        <DeleteModal
                          id={item?._id}
                          handleDelete={handleDelete}
                          isOpen={isOpen}
                          closeModal={closeModal}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <div className="font-bold text-lg">
                  Total Price: ${calculateTotalPrice()}
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 mr-2 rounded"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="bg-first-color text-white px-4 py-2 rounded"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default CartPage;
