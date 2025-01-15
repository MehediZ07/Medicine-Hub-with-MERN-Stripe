import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import HeroSlider from "../components/Home/HeroSlider";
const MainLayout = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <HeroSlider />
      <div className="pt-4 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
