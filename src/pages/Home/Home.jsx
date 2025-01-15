import { Helmet } from "react-helmet-async";

import Medicines from "../../components/Home/Medicines";
import HeroSlider from "../../components/Home/HeroSlider";
import Categories from "../../components/Home/Categories";
import Container from "../../components/Shared/Container";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> medicineNet | Buy Your Desired medicine</title>
      </Helmet>
      <HeroSlider slider={true} sliderImageInput={true} />
      <Container>
        <Categories />
      </Container>
      <Medicines />
    </div>
  );
};

export default Home;
