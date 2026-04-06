import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* womens collection  */}
        <div className="relative flex-1 overflow-hidden rounded-2xl">
          <img
            src={womensCollectionImage}
            alt="womensCollectionImage"
            className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover"
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-10 lg:left-10 bg-white/80 backdrop-blur-md p-4 md:p-5 rounded-lg shadow max-w-[80%]">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* Men's collection  */}
        <div className="relative flex-1 overflow-hidden rounded-2xl">
          <img
            src={mensCollectionImage}
            alt="mensCollectionImage"
            className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover"
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-10 lg:left-10 bg-white/80 backdrop-blur-md p-4 md:p-5 rounded-lg shadow max-w-[80%]">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
