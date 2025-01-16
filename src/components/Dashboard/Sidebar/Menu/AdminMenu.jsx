import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaUserCog}
        label="Manage Category"
        address="manage-category"
      />
      <MenuItem
        icon={FaUserCog}
        label="Manage banner Advertise"
        address="manage-banner"
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders-all"
      />
      <MenuItem
        icon={RiAdvertisementFill}
        label="Add Request"
        address="add-request"
      />
    </>
  );
};

export default AdminMenu;
