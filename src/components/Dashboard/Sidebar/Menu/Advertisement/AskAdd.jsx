import axios from "axios";
import { useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

export default function AskAdd() {
  const [inputData, setInputData] = useState("");
  const { user } = useAuth();
  const handleSubmit = async () => {
    if (!inputData) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/ask-add`, {
        data: inputData,
        sellerName: user?.displayName,
        sellerEmail: user?.email,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex justify-center my-4 items-center rounded-xl p-4 bg-gradient-to-r from-first-color to-second-color">
      <Helmet>
        <title> Medicine Hub | Add Request</title>
      </Helmet>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-xl font-semibold text-center text-first-color mb-4">
          Ask for Advertagment
        </h2>

        <div className="mb-3">
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full p-2 border-2 border-first-color rounded-md focus:outline-none focus:ring-2 focus:ring-second-color text-sm placeholder-first-color"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-first-color text-white py-2 px-5 rounded-md text-sm hover:bg-second-color transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
