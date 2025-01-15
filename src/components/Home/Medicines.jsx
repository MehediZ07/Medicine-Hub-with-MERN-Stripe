import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
const Medicines = () => {
  const { data: medicines, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      {medicines && medicines.length > 0 ? (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {medicines?.map((medicine) => (
            <Card key={medicine._id} medicine={medicine} />
          ))}
        </div>
      ) : (
        <p>No Data Available</p>
      )}
    </Container>
  );
};

export default Medicines;
