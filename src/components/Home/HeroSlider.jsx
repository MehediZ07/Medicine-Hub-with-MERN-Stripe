import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
export default function HeroSlider() {
  const [carouseldata, setCarouseldata] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/carousel-img`
      );
      setCarouseldata(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!inputData) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/carousel-img`, {
        data: inputData,
      });
      console.log("Data submitted:", inputData);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Carousel
        autoPlay
        interval={2000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        transitionTime={500}
      >
        {carouseldata?.map((data, index) => (
          <div key={index}>
            <img src={data.data} alt={`carousel-image-${index}`} />
          </div>
        ))}
      </Carousel>
      <div>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
