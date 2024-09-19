import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              className="cursor-pointer hover:fill-[#007bff] inline"
            >
              <circle cx="10" cy="7" r="6" data-original="#000000" />
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"
              />
            </svg> */}

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
      {/* <div className="flex items-center justify-between border-b-2 py-5 ">
        <Link to="/" className="flex items-center">
          <h3 className="font-extrabold bg-lime-400  text-gray-700 p-2 rounded-md">
            Amr-Sport{" "}
          </h3>{" "}
          <Dumbbell
            className="mx-3 transition-transform duration-1000"
            style={{ transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </Link>
        <SearchField></SearchField>
        <Notification></Notification>
        <SwitchButton></SwitchButton>
        <NavigationMenu className="">
          <NavigationMenuList>
            <div className="flex justify-end items-center">
              <NavigationMenuItem>
                <Link  to="/all-sporting-goods">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    All Products
                  </NavigationMenuLink>
                </Link>
                <Link to="/manage-sporting-goods">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Manage Products
                  </NavigationMenuLink>
                </Link>
                <Link to="/about-us">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
                <Link to="/card">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ShoppingCart />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}

      {/* <header className="flex flex-wrap">
        <nav className="flex w-screen justify-between text-gray-600">
          <div className="w-full py-6  flex space-x-12 items-center ">
            <Link className="text-2xl font-medium" to="/">
              Amr-Sporing
            </Link>
            <ul className="hidden md:flex mx-auto px-5 font-semibold space-x-12">
              <li>
                <Link className="hover:text-gray-900" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-900" to="/all-sporting-goods">
                  Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-900" to="/manage-sporting-goods">
                  Manage-Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-900" to="/about-us">
                  About-Us
                </Link>
              </li>
            </ul>

            <div className="flex-grow border-2 py-1 px-3 lg:flex justify-between round hidden">
              <input
                className="flex-grow text-gray-600 focus:outline-none"
                type="text"
                placeholder="Search Product ..."
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 hover:text-gray-600 transition duration-100 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>

            <div className="hidden xl:flex text-gray-600 space-x-5 items-center">
              <Link
                className="flex items-center hover:text-gray-900"
                to="/card"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cardProducts.length && cardProducts ? (
                  <span className="absolute flex ml-6 font-medium text-lg -mt-5">
                    {cardProducts.length}
                  </span>
                ) : (
                  <span className="absolute flex ml-4 -mt-5">
                    <span className="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                    <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                  </span>
                )}
              </Link>
            </div>
          </div>
          <Link
            className="flex xl:hidden items-center mr-6 hover:text-gray-900"
            to="/card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cardProducts.length && cardProducts ? (
              <span className="absolute flex ml-6 font-medium text-lg -mt-5">
                {cardProducts.length}
              </span>
            ) : (
              <span className="absolute flex ml-4 -mt-5">
                <span className="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
              </span>
            )}
          </Link>
          <Link className="md:hidden self-center  hover:text-gray-900" to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Link>
        </nav>
      </header> */}
    </div>
  );
}
