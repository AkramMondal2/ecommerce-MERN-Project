import { Link } from "react-router-dom";
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import Searchbar from "./Searchbar";
import CartDrawer from "../layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavMenuDrawer = () => {
    setNavMenuOpen(!navMenuOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6  ">
        {/* lefe-logo  */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            ECOM
          </Link>
        </div>
        {/* center nav laik  */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right icons  */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-gray-700"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5 ">
              4
            </span>
          </button>
          {/* Search  */}
          <div className="overflow-hidden">
            <Searchbar />
          </div>
          <button onClick={toggleNavMenuDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile navigation  */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:hidden h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavMenuDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleNavMenuDrawer}
              className="block text-gray-700 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggleNavMenuDrawer}
              className="block text-gray-700 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleNavMenuDrawer}
              className="block text-gray-700 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toggleNavMenuDrawer}
              className="block text-gray-700 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
