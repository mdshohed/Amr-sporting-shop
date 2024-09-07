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

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mx-auto container  max-w-7xl px-4">
      <div className="flex  items-center justify-between border-b-2 py-3 ">
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
      </div>
   </div>
  );
}
