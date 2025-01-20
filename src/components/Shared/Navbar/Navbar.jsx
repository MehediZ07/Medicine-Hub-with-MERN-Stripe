import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
import { FaCartPlus } from "react-icons/fa";
import Headroom from "react-headroom";
import useRole from "../../../hooks/useRole";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();
  return (
    <Headroom>
      <div className=" w-full bg-opacity-50 backdrop-blur-sm  bg-transparent shadow-sm">
        <div className="py-0">
          <Container>
            <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
              {/* Logo */}
              <Link to="/">
                <img src={logo} alt="logo" width="70" height="60" />
              </Link>
              {/* Dropdown Menu */}
              <div className="flex gap-2 items-center">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center text-sm  md:text-base py-1 my-5 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
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
                    `flex items-center text-sm  md:text-base py-1 my-5 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
                      isActive
                        ? "bg-second-color  text-white font-semibold"
                        : "text-second-color "
                    }`
                  }
                >
                  <span className="mx-4 font-medium">Shop</span>
                </NavLink>
                {role === "seller" || role === "admin" ? (
                  ""
                ) : (
                  <NavLink
                    to="cart"
                    end
                    className={({ isActive }) =>
                      `flex items-center text-sm  md:text-base py-1 my-5 rounded-md transition-colors duration-300 transform border-2 solid border-second-color hover:bg-second-color hover:shadow-lg  hover:text-white ${
                        isActive
                          ? "bg-second-color  text-white font-semibold"
                          : "text-second-color "
                      }`
                    }
                  >
                    <span className="my-1 mx-2 font-medium">
                      <FaCartPlus />
                    </span>
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
                          className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Home
                        </Link>

                        {user ? (
                          <>
                            <Link
                              to="/dashboard"
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                            >
                              Dashboard
                            </Link>
                            <Link
                              to="/dashboard/profile"
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                            >
                              My Profile
                            </Link>
                            <div
                              onClick={logOut}
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                            >
                              Logout
                            </div>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                            >
                              Login
                            </Link>
                            <Link
                              to="/signup"
                              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                            >
                              Sign Up
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
