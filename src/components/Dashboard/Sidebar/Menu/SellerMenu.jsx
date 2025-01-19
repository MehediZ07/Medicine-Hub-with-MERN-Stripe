import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import MenuItem from "./MenuItem";
import { FcSalesPerformance } from "react-icons/fc";
const SellerMenu = () => {
  return (
    <>
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      <MenuItem
        icon={FcSalesPerformance}
        label="Sales Revenue"
        address="sales-revenue"
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add medicine"
        address="add-medicine"
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label="Payment History"
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
