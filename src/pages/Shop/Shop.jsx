import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import { FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Shop() {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle the modal open/close
  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const addToCart = async (medicine) => {
    const buyer = {
      name: user?.displayName || "Anonymous", // Fallback if user info is not available
      email: user?.email || "No Email",
    };

    const medicineInfo = { medicine, buyer };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/addCart`, medicineInfo);

      toast.success(`${medicine.name} ${medicine.category} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      console.error("Error details:", error.response?.data);
    }
  };

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse overflow-auto">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Medicine</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                {/* Image column */}
                <td className="border p-2">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-16 h-16 object-contain"
                  />
                </td>
                {/* Medicine name */}
                <td className="border p-2  text-center">{medicine.name}</td>
                {/* Category */}
                <td className="border p-2 text-center">{medicine.category}</td>
                {/* Price */}
                <td className="border p-2 text-center">${medicine.price}</td>
                {/* Actions */}
                <td className="border p-2 text-center ">
                  <div className="flex justify-center">
                    <button
                      className="bg-second-color text-white px-4 py-2 rounded mr-2"
                      onClick={() => addToCart(medicine)}
                    >
                      Select
                    </button>
                    <button
                      className="bg-first-color text-white px-4 py-2 rounded"
                      onClick={() => openModal(medicine)}
                    >
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Medicine Details */}
        {isModalOpen && selectedMedicine && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full overflow-y-auto max-h-[90vh]">
              <div className="flex justify-center mb-4">
                <img
                  src={selectedMedicine?.image}
                  alt={selectedMedicine?.name}
                  className="w-32 h-32 object-contain rounded-lg shadow-md"
                />
              </div>
              <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                {selectedMedicine?.name}
              </h2>
              <div className="space-y-2 mb-4">
                <p>
                  <strong className="text-gray-700">Category:</strong>{" "}
                  {selectedMedicine?.category}
                </p>
                <p>
                  <strong className="text-gray-700">Description:</strong>{" "}
                  {selectedMedicine?.description}
                </p>
                <p>
                  <strong className="text-gray-700">Price:</strong> $
                  {selectedMedicine?.price}
                </p>
                <p>
                  <strong className="text-gray-700">Quantity:</strong>{" "}
                  {selectedMedicine?.quantity}
                </p>
                <p>
                  <strong className="text-gray-700">Offer:</strong>{" "}
                  {selectedMedicine?.offer}$ Off
                </p>
              </div>

              <div className="border-t pt-4 mt-4 flex items-center gap-4">
                <p className="text-gray-700 font-semibold ">Seller:</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedMedicine?.seller.image}
                    alt={selectedMedicine?.seller.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800">
                      {selectedMedicine?.seller.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedMedicine?.seller.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="mt-6 w-full py-2 bg-second-color text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Cart Display */}
        {/* <div>
          <h3 className="mt-6 text-xl font-bold">Cart</h3>
          <ul>
            {cart.map((medicine, index) => (
              <li key={index} className="py-2">
                {medicine.name} - ${medicine.price}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </Container>
  );
}
