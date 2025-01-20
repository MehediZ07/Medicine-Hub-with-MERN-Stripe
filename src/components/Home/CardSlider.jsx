import { useState, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Card from "./Card";

const CardSlider = ({ medicines }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visiblemedicines, setVisiblemedicines] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      const newVisiblemedicines =
        window.innerWidth >= 1024
          ? 4
          : window.innerWidth >= 768
          ? 3
          : window.innerWidth >= 640
          ? 2
          : 1;
      setVisiblemedicines(newVisiblemedicines);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= Math.ceil(medicines?.length / visiblemedicines)
        ? 0
        : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0
        ? Math.ceil(medicines?.length / visiblemedicines) - 1
        : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex items-center  mb-10 ">
      <button
        onClick={handlePrev}
        className="px-4 py-2 text-first-color  rounded-full text-3xl"
      >
        <FaArrowCircleLeft />
      </button>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {medicines
          ?.slice(
            currentIndex * visiblemedicines,
            (currentIndex + 1) * visiblemedicines
          )
          ?.map((medicine, index) => (
            <Card
              key={medicine._id}
              medicine={medicine}
              massage="🔥 Offer gooing on"
            />
          ))}
      </div>
      <button
        onClick={handleNext}
        className="px-4 py-2 text-first-color  rounded-full text-3xl"
      >
        <FaArrowCircleRight />
      </button>
    </div>
  );
};

export default CardSlider;
