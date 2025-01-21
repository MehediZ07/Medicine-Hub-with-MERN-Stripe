import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  if ((loading, isLoading)) return <LoadingSpinner />;
  return (
    <div className="flex justify-center items-center ">
      <Helmet>
        <title>Medicine Hub || Profile</title>
      </Helmet>
      <div className="bg-white shadow-2xl rounded-xl md:w-4/5 lg:w-2/5">
        <div className="relative">
          <img
            alt="cover photo"
            src={coverImg}
            className="w-full h-40 rounded-t-xl object-cover"
          />
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <img
              alt="profile"
              src={user.photoURL}
              className="rounded-full border-4 border-white shadow-lg h-24 w-24 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-14 px-6 py-4">
          <p className="px-4 py-1 text-sm text-first-color bg-[#b4eaef]  rounded-full uppercase tracking-wider shadow-sm">
            {role}
          </p>
          <p className="mt-4 text-2xl font-semibold text-gray-800">
            {user.displayName || "Your Name"}
          </p>
          <p className="text-sm text-gray-600 mt-1 italic">{user.email}</p>

          <div className="flex flex-wrap justify-around items-center w-full mt-6 gap-6">
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm">User ID</p>
              <span className="text-gray-900 font-medium">{user.uid}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4 w-full">
            <button className="w-full bg-first-color text-white py-2 rounded-lg font-semibold shadow-lg ">
              Update Profile
            </button>
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-red-500">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
