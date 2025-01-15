import { Helmet } from "react-helmet-async";

import Medicines from "../../components/Home/Medicines";
import HeroSlider from "../../components/Home/HeroSlider";
import Categories from "../../components/Home/Categories";
import Container from "../../components/Shared/Container";
import FeaturesSection from "../../components/Home/FeaturesSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> medicineNet | Buy Your Desired medicine</title>
      </Helmet>

      <Container>
        <HeroSlider slider={true} sliderImageInput={false} />
        <Categories category={true} addCategory={false} />
        <FeaturesSection />
      </Container>
      <Medicines />
    </div>
  );
};

export default Home;
