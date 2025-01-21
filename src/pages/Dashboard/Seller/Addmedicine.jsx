import { Helmet } from "react-helmet-async";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddMedicineForm from "../../../components/Form/AddMedicineForm";
import { useForm } from "react-hook-form"; // Import useForm hook

const AddMedicine = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Image upload function
  const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "your_upload_preset");
    formData.append("cloud_name", "your_cloud_name");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const medicineData = {
      name: data.name,
      category: data.category,
      description: data.description,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      offer: parseInt(data.offer),
      image: uploadImage?.image,
      seller: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      if (!medicineData.image) {
        throw new Error("Image is required");
      }

      // Upload image
      const imageUrl = await imageUpload(uploadImage.image);
      medicineData.image = imageUrl;

      // Send data to the server
      await axiosSecure.post("/medicines", medicineData);

      toast.success("Medicine added successfully!");
      navigate("/dashboard/my-inventory");
    } catch (err) {
      toast.error("Failed to add medicine!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Medicine Hub | Add Medicine</title>
      </Helmet>
      <AddMedicineForm
        handleSubmit={handleSubmit(onSubmit)} // Pass handleSubmit with onSubmit function
        register={register} // Pass register function here
        errors={errors} // Pass errors object here
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddMedicine;
