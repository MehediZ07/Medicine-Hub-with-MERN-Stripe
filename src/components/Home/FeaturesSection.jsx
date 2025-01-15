import {
  FaShoppingCart,
  FaCreditCard,
  FaHeadset,
  FaTruck,
} from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <div className="my-4">
      <div className=" py-6">
        <h2 className="text-3xl font-bold">Our Features</h2>
        <p className="text-gray-600 mt-2">
          We are offering some extra value on your shoping.
        </p>
      </div>

      <div className="grid mb-4 gap-6  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="flex flex-col items-start bg-base-100 p-6 rounded-lg shadow-md">
          <FaShoppingCart className="text-first-color text-3xl mb-4" />
          <h3 className="text-lg font-bold text-gray-500">
            Large selection of sports goods
          </h3>
          <p className="text-gray-400 mt-2">
            Explore a wide range of athletic equipment
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-start bg-base-100 p-6 rounded-lg shadow-md">
          <FaCreditCard className="text-first-color text-3xl mb-4" />
          <h3 className="text-lg font-bold text-gray-500">
            Credit card payment in application
          </h3>
          <p className="text-gray-400 mt-2">
            Convenient and secure online transactions
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-start bg-base-100 p-6 rounded-lg shadow-md">
          <FaHeadset className="text-first-color text-3xl mb-4" />
          <h3 className="text-lg font-bold text-gray-500">
            24/7 support from our partners
          </h3>
          <p className="text-gray-400 mt-2">
            Count on our reliable assistance available around the clock
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-start bg-base-100 p-6 rounded-lg shadow-md">
          <FaTruck className="text-first-color text-3xl mb-4" />
          <h3 className="text-lg font-bold text-gray-500">
            Fast and affordable our delivery
          </h3>
          <p className="text-gray-400 mt-2">
            Swift and reliable shipping at competitive rates
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
