import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
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
    </>
  );
};

export default AdminMenu;
