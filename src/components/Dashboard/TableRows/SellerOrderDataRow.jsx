import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const SellerOrderDataRow = ({ orderData, refetch, role }) => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const {
    name,
    customer,
    price,
    quantity,
    transactionId,
    _id,
    status,
    medicineId,
  } = orderData || {};

  // handle order delete/cancellation
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);

      await axiosSecure.patch(`/medicines/quantity/${medicineId}`, {
        quantityToUpdate: quantity,
        status: "increase",
      });

      refetch();
      toast.success("Order Cancelled.");
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      closeModal();
    }
  };

  // handle status change
  const handleStatus = async (newStatus) => {
    if (status === newStatus) return;
    try {
      await axiosSecure.patch(`/orders/${_id}`, {
        status: newStatus,
      });

      refetch();
      toast.success("Status Updated");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{customer?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{transactionId}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-black bg-green-200 opacity-50 rounded-full py-1 px-3 w-fit whitespace-no-wrap">
          {status}
        </p>
      </td>

      {role === "seller" ? (
        <></>
      ) : (
        <>
          {" "}
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center gap-2">
              <select
                required
                defaultValue={status}
                onChange={(e) => handleStatus(e.target.value)}
                disabled={status === "Delivered"}
                className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
                name="category"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
              <button
                onClick={() => setIsOpen(true)}
                className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                ></span>
                <span className="relative">Cancel</span>
              </button>
            </div>
            <DeleteModal
              id=""
              handleDelete={handleDelete}
              isOpen={isOpen}
              closeModal={closeModal}
            />
          </td>
        </>
      )}
    </tr>
  );
};

SellerOrderDataRow.propTypes = {
  orderData: PropTypes.object,
  refetch: PropTypes.func,
  role: PropTypes.string,
};

export default SellerOrderDataRow;
