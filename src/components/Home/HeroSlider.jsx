import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function HeroSlider({ slider, sliderImageInput = true }) {
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
      <Helmet>
        <title> Medicine Hub | Manage Banner</title>
      </Helmet>
      {slider && (
        <Carousel
          autoPlay
          interval={2000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          transitionTime={500}
          style={{ borderRadius: ".75rem" }} // Set height here
        >
          {carouseldata?.map((data, index) => (
            <div className="rounded-xl mt-4" key={index}>
              <img
                className="overflow-hidden object-cover rounded-xl"
                src={data.data}
                alt={`carousel-image-${index}`}
              />
            </div>
          ))}
        </Carousel>
      )}

      {sliderImageInput && (
        <div className="flex justify-center my-4 items-center rounded-xl p-4 bg-gradient-to-r from-first-color to-second-color">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-semibold text-center text-first-color mb-4">
              Add New Advertagment
            </h2>

            <div className="mb-3">
              <input
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                className="w-full p-2 border-2 border-first-color rounded-md focus:outline-none focus:ring-2 focus:ring-second-color text-sm placeholder-first-color"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-first-color text-white py-2 px-5 rounded-md text-sm hover:bg-second-color transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
