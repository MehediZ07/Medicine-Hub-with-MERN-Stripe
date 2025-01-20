import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ medicine, massage }) => {
  const { name, quantity, price, image, _id, offer } = medicine || {};
  return (
    <Link
      to={`/medicine/${_id}`}
      className="col-span-1 cursor-pointer group p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-transform duration-300"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Image Section */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
          <img
            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
            src={image}
            alt={`${name} Image`}
          />
          {/* Discount Badge */}
          {offer > 0 && (
            <div className="absolute top-2 left-2 bg-first-color/70 text-white px-3 py-1 text-xs font-bold rounded-md shadow-sm">
              {offer} Tk off
            </div>
          )}
          {/* Delivery Time */}
          <p className="absolute bottom-2 left-2 bg-second-color/50 text-white px-2 py-1 text-xs font-medium rounded-md">
            {massage}
          </p>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-800 leading-snug line-clamp-2">
            {name}
          </h3>

          {/* Price Section */}
          <div className="flex justify-between">
            <h3 className="  text-gray-600 ">{quantity} Left</h3>
            <div className="flex items-center gap-2">
              {offer > 0 && (
                <div className="text-gray-400 text-lg line-through">
                  {price}
                </div>
              )}
              <div className="text-first-color font-bold text-xl mr-2">
                ৳{price - offer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
Card.propTypes = {
  medicine: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default Card;
