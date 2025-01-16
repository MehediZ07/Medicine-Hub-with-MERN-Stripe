import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add medicine"
        address="add-medicine"
      />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      />
      <MenuItem
        icon={RiAdvertisementLine}
        label="Ask Advertising"
        address="ask-add"
      />
    </>
  );
};

export default SellerMenu;
