import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";

import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/cart?email=${user.email}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      return (
        total +
        (item?.medicine?.price - item?.medicine?.offer) * item?.buyQuantity
      );
    }, 0);
  };

  const increaseQuantity = async (id, stock, buyerQuentity) => {
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
      <Helmet>
        <title> Medicine Hub | Cart</title>
      </Helmet>
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
                        ${item?.medicine?.price - item?.medicine?.offer}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {item?.medicine?.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {item?.buyQuantity}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          className="text-green-500  px-2 py-1 text-3xl  rounded"
                          onClick={() =>
                            increaseQuantity(
                              item?._id,
                              item?.medicine?.quantity,
                              item?.buyQuantity
                            )
                          }
                        >
                          <CiSquarePlus />
                        </button>

                        <button
                          className={`text-red-500  px-2 py-1 text-3xl mr-2 rounded ${
                            item?.buyQuantity <= 1 && "hidden"
                          }`}
                          onClick={() => decreaseQuantity(item?._id)}
                          disabled={item?.buyQuantity <= 0}
                        >
                          <CiSquareMinus />
                        </button>

                        <button
                          className={`text-red-500  px-2 py-1 text-3xl mr-2 rounded ${
                            item?.buyQuantity > 1 && "hidden"
                          }`}
                          onClick={() => handleDelete(item?._id)}
                          disabled={item?.buyQuantity > 1}
                        >
                          <CiSquareMinus />
                        </button>
                        <button
                          className="text-red-500  px-2 py-1 text-3xl rounded"
                          onClick={() => handleDelete(item?._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <div className="font-bold text-lg mb-4">
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
