import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../../../assets/images/logo.png";
import MenuItem from "./Menu/MenuItem";

import useAuth from "../../../hooks/useAuth";

import AdminMenu from "./Menu/AdminMenu";

import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";

import useRole from "../../../hooks/useRole";
import Headroom from "react-headroom";

const Sidebar = () => {
  const { logOut, user } = useAuth();

  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <Headroom>
        <div className="bg-second-color/30 text-white flex justify-between md:hidden">
          <div>
            <div className="block cursor-pointer px-4 py-2 font-bold">
              <div className="flex flex-col items-center   ">
                <img
                  alt="profile"
                  src={user?.photoURL}
                  className="rounded-full border-2 border-white  shadow-lg h-16 w-16 object-cover"
                />
              </div>
            </div>
          </div>

          <button onClick={handleToggle} className="mobile-menu-button p-4   ">
            <AiOutlineBars className="h-10 w-10 text-first-color " />
          </button>
        </div>
      </Headroom>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#b4eaef] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center  mx-auto">
              <div className="flex flex-col items-center  px-6 py-4">
                <img
                  alt="profile"
                  src={user?.photoURL}
                  className="rounded-full border-4 border-white -mt-6 shadow-lg h-24 w-24 object-cover"
                />
                <p className="px-3 py-[.18rem] mt-2 text-sm border solid border-first-color bg-first-color/10 text-first-color rounded-full uppercase tracking-wider shadow-sm">
                  {role}
                </p>
                <p className="mt-2 text-xl font-semibold text-first-color">
                  {user?.displayName || "Your Name"}
                </p>
                <p className="text-sm text-first-color/85 mt-1 italic">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="divider -mt-4"></div>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 -mt-6">
            <nav>
              {/*  Menu Items */}
              <img
                alt="profile"
                src={user?.photoURL}
                className="rounded-full border-2 border-white   h-16 w-16 object-cover mx-auto md:hidden"
              />
              <p className="px-3 py-[.18rem] mt-2 text-sm border solid border-first-color bg-first-color/10 text-first-color rounded-full uppercase tracking-wider  w-fit mx-auto md:hidden">
                {role}
              </p>

              {role === "customer" && <CustomerMenu />}
              {role === "seller" && <SellerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-first-color   hover:text-white transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
