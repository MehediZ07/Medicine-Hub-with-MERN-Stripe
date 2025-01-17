import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
const UpdateMedicinesForm = ({ medicine, refetch, setIsEditModalOpen }) => {
  const axiosSecure = useAxiosSecure();

  const user = useAuth();
  const navigate = useNavigate();
  console.log(user);

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

  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Button" },
  });
  const { image, name, category, price, quantity, _id, description, offer } =
    medicine || {};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadImage({ image: file, url });

      // Cleanup: revoke the URL when no longer needed
      return () => URL.revokeObjectURL(url);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const offer = parseInt(form.offer.value);
    const image = form.image.files[0]; // Get the image file

    // Upload the image and get the URL
    let imageUrl = uploadImage?.url;
    if (image) {
      try {
        imageUrl = await imageUpload(image); // Assume imageUpload function handles file upload to a server or cloud
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed. Please try again.");
        return; // Early exit if image upload fails
      }
    }

    // Create medicine data object (including the uploaded image URL)
    const medicineData = {
      name,
      description,
      category,
      price,
      quantity,
      offer,
      image: imageUrl, // Image URL after successful upload
    };

    console.table(medicineData); // Optionally log the data to the console for debugging

    try {
      // Send PATCH request to update the medicine data on the server
      await axiosSecure.patch(`/medicines/${_id}`, medicineData);
      toast.success("Medicine updated successfully!");
      refetch();
      navigate("/dashboard/my-inventory"); // Redirect to another page after success
    } catch (err) {
      console.error("Error updating medicine:", err);
      toast.error("Failed to update the medicine. Please try again.");
    }
  };
  if (loadingStat) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                defaultValue={name}
                placeholder={name}
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
                defaultValue={category}
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
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write medicine description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
                defaultValue={description}
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  defaultValue={price}
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  defaultValue={quantity}
                  required
                />
              </div>
              {/* Offer */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Offer
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-second-color focus:outline-second-color/70 rounded-md bg-white"
                  name="offer"
                  id="offer"
                  type="number"
                  placeholder="Enter Offer Amount"
                  defaultValue={offer}
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={handleImageChange}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    {uploadImage && uploadImage?.image?.size ? (
                      <div className="flex gap-5 items-center">
                        <img className="w-20" src={uploadImage?.url} alt="" />
                        <p>Image Size: {uploadImage?.image?.size} Bytes</p>
                      </div>
                    ) : (
                      <img className="w-32" src={image} alt="" />
                    )}
                    <div className="bg-lime-500 mt-2 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              Update medicine
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdateMedicinesForm.propTypes = {
  medicine: PropTypes.object,
  refetch: PropTypes.func,
  setIsEditModalOpen: PropTypes.func,
};
export default UpdateMedicinesForm;
