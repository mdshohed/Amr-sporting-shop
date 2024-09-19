
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import logo from '../../assets/logo/Amr-Sporting-logo.png'

export default function Navbar() {
  const cardProducts = useAppSelector((state) => state.cart.products);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <div className="bg-gray-800 sticky top-0 z-50 mb-4">
    <div className="bg-gray-800 ">
      <div className="mx-auto container max-w-7xl px-4">
        <header className="flex  py-4 px-4 sm:px-4  min-h-[80px] tracking-wide relative z-50">
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            {/* <Link to="/" className="text-2xl font-bold text-white"> */}
            <Link to="/" >
              <img
              src={logo}
              alt="logo"
              className="w-28"
            />
              {/* Amr-Sporing */}
            </Link>

            <div
              style={{ display: isMenuOpen ? "block" : "none" }}
              id="collapseMenu"
              className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
            >
              {/* toggleClose */}
              <button
                onClick={handleClick}
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 fill-black"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>

              {/* <NavigationMenu className=""> */}
              {/* <NavigationMenuList> */}
              <ul className="lg:flex gap-x-5 text-white max-lg:space-y-3 max-lg:fixed max-lg:bg-gray-800 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                {/* <NavigationMenuItem> */}
                <li className="mb-6 hidden max-lg:block text-2xl font-bold">
                  <Link to="/">
                    <img
                    src={logo}
                    alt="logo"
                    className="w-36"
                  />
                    {/* Amr-Sporting */}
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link
                    to="/"
                    className="hover:text-[#007bff] font-medium block "
                  >
                    {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
                    Home
                    {/* </NavigationMenuLink> */}
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link
                    to="/all-sporting-goods"
                    className="hover:text-[#007bff] font-medium block "
                  >
                    {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
                    All Product
                    {/* </NavigationMenuLink> */}
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link
                    to="/manage-sporting-goods"
                    className="hover:text-[#007bff] font-medium block "
                  >
                    {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
                    Manage Product
                    {/* </NavigationMenuLink> */}
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link to="/about-us" className="hover:text-[#007bff] font-medium block ">
                    {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
                    About Us
                    {/* </NavigationMenuLink> */}
                  </Link>
                </li>
                {/* </NavigationMenuItem> */}
              </ul>

              {/* </NavigationMenuList> */}
              {/* </NavigationMenu> */}
            </div>

            <div className="flex items-center max-lg:ml-auto space-x-5">
             

              <Link to="/card" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  className="cursor-pointer  fill-white hover:fill-[#007bff] inline"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                    data-original="#000000"
                  ></path>
                </svg>
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                  {cardProducts.length && cardProducts
                    ? cardProducts.length
                    : 0}
                </span>
              </Link>

              <button
                onClick={handleClick}
                id="toggleOpen"
                className="lg:hidden !ml-7"
              >
                <svg
                  className="w-7 h-7 fill-white"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>
      
    </div>
  );
}
