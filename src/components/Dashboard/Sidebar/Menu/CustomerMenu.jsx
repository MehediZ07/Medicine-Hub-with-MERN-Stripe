import { BsFingerprint } from "react-icons/bs";

import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
const CustomerMenu = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const requestHandler = async () => {
    try {
      // send a request to server
      const { data } = await axiosSecure.patch(`/users/${user?.email}`);
      console.log(data);
      toast.success("Successfully Applied to become a seller👍");
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data + "👊");
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="Payment History"
        address="my-orders"
      />

      <BecomeSellerModal
        requestHandler={requestHandler}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default CustomerMenu;
