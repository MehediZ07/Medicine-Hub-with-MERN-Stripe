import { Helmet } from "react-helmet-async";

import Medicines from "../../components/Home/Medicines";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> medicineNet | Buy Your Desired medicine</title>
      </Helmet>
      <Medicines />
    </div>
  );
};

export default Home;
