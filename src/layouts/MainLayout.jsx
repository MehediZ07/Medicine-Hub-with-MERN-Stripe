import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import ScrollToTop from "react-scroll-to-top";

const MainLayout = () => {
  const scrollToTopStyle = {
    background: "linear-gradient(to bottom, #04bdcf, #04bdcf)",
  };
  return (
    <div className="">
      <Navbar />

      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop
        smooth
        style={scrollToTopStyle}
        className={` rounded-xl w-12 h-12 flex justify-center items-center`}
      />
    </div>
  );
};

export default MainLayout;
