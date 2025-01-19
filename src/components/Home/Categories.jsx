import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import axios from "axios";
export default function Categories({ category = false, addCategory = true }) {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/medicine-categories`
      );
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [inputData, setInputData] = useState({
    category_name: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!inputData.category_name || !inputData.image) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/medicine-categories`, {
        category_name: inputData.category_name,
        image: inputData.image,
      });

      console.log("Category submitted:", inputData);
      fetchData();
      setInputData({
        category_name: "",
        image: "",
      });
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className=" max-w-7xl mx-auto mb-4">
        {category && (
          <>
            {" "}
            <div className="">
              <h2 className="text-3xl font-bold">Language Categorys</h2>
              <p className="text-gray-600 mt-2">
                Out All categorie here, you can click and see all of our
                tutorial by category.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12  ">
              {categories.map((category, index) => (
                <Link
                  to={`/shop/${category?.category_name}`}
                  key={index}
                  className={`flex items-center justify-center p-4 bg-base-100 border-2 solid border-gray-200 rounded-lg  hover:shadow transition duration-200 ${
                    index === 8
                      ? "col-span-2 md:col-span-1 w-1/2 md:w-full mx-auto"
                      : ""
                  }`}
                >
                  <span className={`text-2xl mr-3`}>
                    <img src={category?.category_name} alt="" />
                  </span>
                  <span className="text-xl font-semibold">
                    {category?.category_name}
                  </span>
                  <span className="ml-2 right-0">
                    {category?.number_of_medicines}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      {addCategory && (
        <div className="flex justify-center items-center  bg-gradient-to-r from-first-color to-second-color rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-md my-4 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center text-first-color mb-4">
              Add Category
            </h2>

            <div className="mb-3">
              <label className="block text-first-color text-sm mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="category_name"
                value={inputData.category_name}
                onChange={handleChange}
                className="w-full p-2 border-2 border-first-color rounded-md focus:outline-none focus:ring-2 focus:ring-second-color"
                placeholder="Category name"
              />
            </div>

            <div className="mb-3">
              <label className="block text-first-color text-sm mb-1">
                Category Image URL
              </label>
              <input
                type="text"
                name="image"
                value={inputData.image}
                onChange={handleChange}
                className="w-full p-2 border-2 border-first-color rounded-md focus:outline-none focus:ring-2 focus:ring-second-color"
                placeholder="Image URL"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-first-color text-white py-1.5 px-4 text-sm hover:bg-second-color transition duration-300 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
