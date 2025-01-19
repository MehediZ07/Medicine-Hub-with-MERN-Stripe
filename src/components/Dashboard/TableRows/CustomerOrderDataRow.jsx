/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const CustomerOrderDataRow = ({ orderData, refetch, i }) => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { name, totalPrice, totalQuantity, status, transactionId } = orderData;

  // handle order delete/cancellation
  // const handleDelete = async (id) => {
  //   try {
  //     //fetch delete request
  //     await axiosSecure.delete(`/orders/${_id}`);
  //     // increase quantity from medicine collection
  //     await axiosSecure.patch(`/medicines/quantity/${medicineId}`, {
  //       quantityToUpdate: quantity,
  //       status: "increase",
  //     });
  //     // call refetch to refresh ui(fetch orders data again)
  //     refetch();
  //     toast.success("Order Cancelled.");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.response.data);
  //   } finally {
  //     closeModal();
  //   }
  // };
  return (
    <tr className="text-center">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{i + 1}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {name.length > 20 ? name.substring(0, 20) + "..." : name}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{totalQuantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${totalPrice}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{transactionId}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link
          to={`/invoice/${transactionId}`}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer">See Invoice</span>
        </Link>

        {/* <DeleteModal
          id=""
          handleDelete={handleDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        /> */}
      </td>
    </tr>
  );
};

CustomerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
};

export default CustomerOrderDataRow;
