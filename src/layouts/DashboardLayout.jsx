import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";
import runLottie from "../assets/images/run-lottie.json";
import Lottie from "lottie-react";
const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen md:flex bg-white">
      <Helmet>
        <title> Medicine Hub | Dashboard</title>
      </Helmet>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
          <button
            onClick={() => navigate("/")}
            className="fixed bottom-4 right-4 bg-first-color/80 text-white px-4 flex rounded-full shadow-lg items-center text-xl font-semibold hover:bg-first-color pb-1 py-[.37]"
          >
            <Lottie
              animationData={runLottie}
              className="transform scale-x-[-1]"
              style={{ width: "40px", height: "40px" }}
            ></Lottie>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
