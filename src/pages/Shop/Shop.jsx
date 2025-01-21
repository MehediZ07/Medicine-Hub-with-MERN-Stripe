import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet-async";

export default function Shop() {
  const { category } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchQuery, setSearchQuery] = useState(category || "");
  const [sortDirection, setSortDirection] = useState("asc"); // or "desc"
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role] = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const addToCart = async (medicine) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    const buyer = {
      name: user?.displayName || "Anonymous",
      email: user?.email || "No Email",
    };

    const medicineInfo = { medicine, buyer, buyQuantity: 1 };

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

  const filteredMedicines = medicines
    ?.filter(
      (medicine) =>
        // Ensure 'name' and 'category' are defined before applying filters
        medicine?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine?.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortDirection === "asc")
        return a.price - a.offer - (b.price - b.offer);
      return b.price - b.offer - (a.price - a.offer);
    });

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-16 h-16 object-contain"
        />
      ),
    },
    { name: "Medicine", selector: (row) => row.name, sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    {
      name: "Price Ofter off",
      selector: (row) => `$${row.price - row.offer}`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className={`text-white px-4 py-2 rounded ${
              role !== "customer" || row.quantity <= 0
                ? "cursor-not-allowed bg-red-600"
                : "bg-first-color hover:bg-first-color"
            }`}
            onClick={() => addToCart(row)}
            disabled={role !== "customer" || row.quantity <= 0}
          >
            {row.quantity <= 0 ? "Out Of Stock" : "Add to Cart"}
          </button>
          <button
            className="bg-second-color/80 text-white px-4 py-2 rounded hover:bg-second-color"
            onClick={() => openModal(row)}
          >
            <FaEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Helmet>
        <title> Medicine Hub | Shop</title>
      </Helmet>
      <div className="flex items-center justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-1/3 outline-first-color border-first-color"
        />
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-first-color text-white"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredMedicines}
        pagination
        highlightOnHover
        className="shadow-lg rounded-lg"
      />

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

            <button
              onClick={closeModal}
              className="mt-6 w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
