import Marquee from "react-fast-marquee";
export default function OursPartner() {
  return (
    <div className="mb-12">
      <div className=" py-6 mt-12 mb-4">
        <h2 className="text-3xl font-bold text-first-color">Our Partnar</h2>
        <p className="text-gray-400 mt-2">
          All those partners we have in relationship
        </p>
      </div>
      <Marquee
        pauseOnHover={true}
        speed={80}
        gradient={true}
        gradientWidth={100}
      >
        {/*  Card 1*/}
        <div className="bg-gradient-to-br w-72 mr-4 from-white via-purple-200  to-purple-300 rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Hamdard Laboratories
            </h2>
          </div>
          <img
            className="w-20 h-20 rounded-l-full rounded-t-full"
            src="https://i.ibb.co.com/HgXX5Bv/R.png"
            alt=""
          />
        </div>
        {/*  Card 2*/}
        <div className="bg-gradient-to-br w-72 mr-4 from-white via-orange-100 to-orange-200 rounded-xl p-6 shadow-lg flex  items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              AKME Pharmaceuticals
            </h2>
          </div>
          <img
            className="w-20 h-20 rounded-l-full rounded-t-full"
            src="https://i.ibb.co.com/sJ0ZgVn/image.png"
            alt=""
          />
        </div>
        {/*  Card 3*/}
        <div className="bg-gradient-to-br w-72 mr-4 from-white via-pink-200 to-pink-300 rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Eskayef Pharmaceuticals Ltd
            </h2>
          </div>
          <img
            className="w-20 h-20 rounded-l-full rounded-t-full"
            src="https://i.ibb.co.com/LNZFZs6/OIP.jpg"
            alt=""
          />
        </div>
        {/*  Card 4*/}
        <div className="bg-gradient-to-br w-72 mr-4 from-white via-green-200 to-green-300 rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Incepta Pharma
            </h2>
          </div>
          <img
            className="w-20 h-20 rounded-l-full rounded-t-full"
            src="https://i.ibb.co.com/VTsjTp3/OIP.jpg"
            alt=""
          />
        </div>

        {/*  Card 5*/}
        <div className="bg-gradient-to-br w-72 mr-4 from-white via-blue-200 to-blue-300 rounded-xl p-6 shadow-lg flex  items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Square Pharmaceuticals PLC
            </h2>
          </div>
          <img
            className="w-20 h-20 rounded-l-full rounded-t-full"
            src="https://i.ibb.co.com/9yFG7Wq/unnamed.jpg"
            alt=""
          />
        </div>
        {/*  Card 6*/}
        <div className="bg-gradient-to-br w-72 mr-4 from-white via-yellow-100 to-yellow-200 rounded-xl p-6 shadow-lg flex  items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Glaxosmithkline Pharmaceuticals
            </h2>
          </div>
          <img
            className="w-20 h-20 rounded-l-full rounded-t-full"
            src="https://i.ibb.co.com/9H06ML2/OIP.jpg"
            alt=""
          />
        </div>
      </Marquee>
    </div>
  );
}
