import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../Shared/LoadingSpinner";
import axios from "axios";
import { useEffect, useState } from "react";

const AddMedicineForm = ({
  handleSubmit,
  register,
  errors,
  uploadImage,
  setUploadImage,
  loading,
}) => {
  const [categories, setCategories] = useState({});
  const [loadingStat, setLoadingStat] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/medicine-categories`
      );
      setCategories(response.data);
      setLoadingStat(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loadingStat) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                {...register("name", { required: "Medicine name is required" })}
                className="w-full px-4 py-3 text-gray-800 border border-second-color focus:outline-second-color/70 rounded-md bg-white"
                id="name"
                type="text"
                placeholder="Enter Medicine Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 text-gray-800 border border-second-color focus:outline-second-color/70 rounded-md bg-white"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category?._id} value={category?.category_name}>
                      {category?.category_name}
                    </option>
                  );
                })}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-second-color bg-white focus:outline-second-color/70"
                id="description"
                placeholder="Write medicine description here..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-6">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-3 text-gray-800 border border-second-color focus:outline-second-color/70 rounded-md bg-white"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  {...register("quantity", {
                    required: "Quantity is required",
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-3 text-gray-800 border border-second-color focus:outline-second-color/70 rounded-md bg-white"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>
            {/* Offer */}
            <div className="space-y-1 text-sm">
              <label htmlFor="offer" className="block text-gray-600">
                Offer
              </label>
              <input
                {...register("offer", {
                  required: "Offer is required",
                  valueAsNumber: true,
                })}
                className="w-full px-4 py-3 text-gray-800 border border-second-color focus:outline-second-color/70 rounded-md bg-white"
                id="offer"
                type="number"
                placeholder="Enter Offer Amount"
              />
              {errors.offer && (
                <p className="text-red-500 text-sm">{errors.offer.message}</p>
              )}
            </div>
            {/* Image */}
            <div className=" p-4 w-full m-auto rounded-lg">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUploadImage({
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
              {uploadImage?.image && (
                <div className="mt-3 flex gap-5 items-center">
                  <img src={uploadImage.url} alt="preview" className="w-20" />
                  <p>Image: {uploadImage.image.name}</p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {loading ? <TbFidgetSpinner className="animate-spin" /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddMedicineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  uploadImage: PropTypes.object,
  setUploadImage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default AddMedicineForm;
