import { Helmet } from "react-helmet-async";

import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddMedicineForm from "../../../components/Form/AddMedicineForm";

const Addmedicine = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Button" },
  });

  const [loading, setLoading] = useState(false);
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const offer = parseInt(form.offer.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create medicine data object
    const medicineData = {
      name,
      category,
      description,
      price,
      quantity,
      offer,
      image: imageUrl,
      seller,
    };

    console.table(medicineData);
    // save medicine in db
    try {
      // post req
      await axiosSecure.post("/medicines", medicineData);
      toast.success("Data Added Successfully!");
      navigate("/dashboard/my-inventory");
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add medicine | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddMedicineForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default Addmedicine;
