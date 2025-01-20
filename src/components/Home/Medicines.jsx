import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import CardSlider from "./CardSlider";
import { Link } from "react-router-dom";
const Medicines = () => {
  const { data: medicines, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`);
      return data;
    },
  });

  const offeerMedicine = medicines.filter((item) => item.offer > 0);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className=" py-6 mt-12">
        <h2 className="text-3xl font-bold">Our Medicine</h2>
        <p className="text-gray-600 mt-2">
          Here You can see aou all kind of available medicine
        </p>
      </div>
      {medicines && medicines.length > 0 ? (
        <div className="flex flex-col gap-10">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {medicines.slice(0, 10)?.map((medicine) => (
              <Card
                key={medicine._id}
                medicine={medicine}
                massage="24/7 Delevary"
              />
            ))}
          </div>
          <Link
            to="shop"
            className="py-3 px-6 bg-first-color/70 text-white font-semibold rounded-md mx-auto"
          >
            View All
          </Link>
        </div>
      ) : (
        <p>No Data Available</p>
      )}
      <div className=" py-6 mt-6">
        <h2 className="text-3xl font-bold">🔥 Our Offers</h2>
        <p className="text-gray-600 mt-2">
          We are offering some discount on these product.
        </p>
      </div>
      <CardSlider medicines={offeerMedicine}></CardSlider>
    </div>
  );
};

export default Medicines;
