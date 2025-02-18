import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
import { FaCartPlus, FaHome } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoMdCart } from "react-icons/io";
import Headroom from "react-headroom";
import useRole from "../../../hooks/useRole";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaShop } from "react-icons/fa6";
import { MdDashboardCustomize, MdOutlineAppRegistration } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import TheemToggle from "../TheemToggle";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();

  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/cart?email=${user.email}`
      );
      return data;
    },
  });
  return (
    <Headroom>
      <div className=" w-full bg-opacity-50 backdrop-blur-sm  bg-second-color/10 shadow-sm">
        <div className="py-1">
          <Container>
            <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
              {/* Logo */}
              <div className="flex gap-2 items-center">
                <Link to="/">
                  <img src={logo} alt="logo" width="100" height="80" />
                </Link>
                <TheemToggle />
              </div>
              {/* Dropdown Menu */}
              <div className="flex gap-2 items-center">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `hidden md:flex items-center text-sm  md:text-base py-1 my-5 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
                      isActive
                        ? "bg-second-color  text-white font-semibold"
                        : "text-second-color "
                    }`
                  }
                >
                  <span className="mx-4 ">Home</span>
                </NavLink>
                <NavLink
                  to="shop"
                  end
                  className={({ isActive }) =>
                    `hidden md:flex items-center text-sm  md:text-base py-1 my-5 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
                      isActive
                        ? "bg-second-color  text-white font-semibold"
                        : "text-second-color "
                    }`
                  }
                >
                  <span className="mx-4 font-medium">Medicine</span>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `hidden md:flex items-center text-sm  md:text-base py-1 my-5 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
                      isActive
                        ? "bg-second-color  text-white font-semibold"
                        : "text-second-color "
                    }`
                  }
                >
                  <span className="mx-4 font-medium">Dashboard</span>
                </NavLink>

                {role === "seller" || role === "admin" ? (
                  ""
                ) : (
                  <NavLink
                    to="cart"
                    end
                    className={({ isActive }) =>
                      `hidden md:flex items-center text-sm  md:text-base py-1 my-5 mr-1 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
                        isActive
                          ? "bg-second-color  text-white font-semibold"
                          : "text-second-color "
                      }`
                    }
                  >
                    <div className="relative">
                      <span className=" absolute translate-x-2 -top-[1.1rem] text-base ml-1 badge border-2 solid border-second-color text-second-color">
                        {cartItems ? cartItems.length : "0"}
                      </span>
                      <div className="text-2xl">
                        <IoMdCart />
                      </div>
                    </div>
                  </NavLink>
                )}
                <div className="relative">
                  <div className="flex flex-row items-center gap-3">
                    {/* Dropdown btn */}
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className=" pl-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition z-[1000]"
                    >
                      <AiOutlineMenu className="text-second-color" />
                      <div className="">
                        {/* Avatar */}
                        <img
                          className="rounded-full w-[2.25rem] h-[2.25rem] object-cover"
                          referrerPolicy="no-referrer"
                          src={
                            user && user.photoURL ? user.photoURL : avatarImg
                          }
                          alt="profile"
                          height="30"
                          width="30"
                        />
                      </div>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                      <div className="flex flex-col cursor-pointer">
                        <Link
                          to="/"
                          className="flex gap-2 items-center md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          <FaHome /> Home
                        </Link>
                        <Link
                          to="shop"
                          className="flex gap-2 items-center md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          <FaShop /> Medicine
                        </Link>
                        <Link
                          to="dashboard"
                          className="flex gap-2 items-center md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          <MdDashboardCustomize /> Dashboard
                        </Link>
                        <Link
                          to="cart"
                          className="md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold flex gap-2 items-center"
                        >
                          <FaCartPlus /> Cart
                        </Link>

                        {user ? (
                          <>
                            <Link
                              to="/dashboard/profile"
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold flex gap-2 items-center"
                            >
                              <ImProfile /> My Profile
                            </Link>
                            <div
                              onClick={logOut}
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer flex gap-2 items-center"
                            >
                              <FiLogOut /> Logout
                            </div>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                            >
                              <FiLogIn /> Login
                            </Link>
                            <Link
                              to="/signup"
                              className="flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                            >
                              <MdOutlineAppRegistration /> Sign Up
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
