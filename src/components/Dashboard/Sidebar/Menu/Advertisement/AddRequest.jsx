import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../Shared/LoadingSpinner";

import toast from "react-hot-toast";

import { AiOutlineFundView } from "react-icons/ai";

export default function AddRequest() {
  const [addRequest, setAddRequest] = useState({});
  const [loading, setLoading] = useState(true);
  const handleCopyToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copyed");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ask-add`
      );
      setAddRequest(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="table-container overflow-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">Seller Name</th>
            <th className="px-4 py-2 border-b">Seller Email</th>
            <th className="px-4 py-2 border-b">Advertisement Image URL</th>
            <th className="px-4 py-2 border-b">View Image</th>
          </tr>
        </thead>
        <tbody>
          {addRequest.map((seller, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{seller?.sellerName}</td>
              <td className="px-4 py-2 border-b">{seller?.sellerEmail}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleCopyToClipboard(seller.adImageUrl)}
                  className="text-blue-500 hover:underline mx-auto text-center"
                >
                  Copy Image URL
                </button>
              </td>
              <td className="px-3 py-1 border-b ">
                <a
                  href={seller?.data}
                  target="_blank"
                  className="px-3 py-1 flex gap-1 items-center text-black bg-green-300 opacity-50 rounded-full w-fit"
                  rel="noopener noreferrer "
                >
                  View Add <AiOutlineFundView />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
