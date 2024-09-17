import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { Link } from "@radix-ui/react-navigation-menu";
import { Clapperboard, Dumbbell, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchField from "./SearchField";
import Notification from "./Notification";
import SwitchButton from "./SwitchButton";
import { useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  const cardProducts = useAppSelector((state) => state.cart.products);

  return (
    <div className="mx-auto container max-w-7xl px-4">
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

      <header className="flex flex-wrap">
        <nav className="flex w-screen justify-between text-gray-600">
          <div className="w-full py-6  flex space-x-12 items-center ">
            <Link className="text-2xl font-bold" to="/">
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
                  <span className="absolute flex ml-6 font-bold text-lg -mt-5">
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
              <span className="absolute flex ml-6 font-bold text-lg -mt-5">
                {cardProducts.length}
              </span>
            ) : (
              <span className="absolute flex ml-4 -mt-5">
                <span className="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
              </span>
            )}
          </Link>
          <a className="md:hidden self-center  hover:text-gray-900" href="#">
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
          </a>
        </nav>
      </header>
    </div>
  );
}
