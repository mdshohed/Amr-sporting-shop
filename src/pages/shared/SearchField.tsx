import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const SearchField = () => {
  return (
    <>
      {/* <div className=" border md:flex items-center justify-center">
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex ">
              <input
                type="text"
                className="  bg-white  focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                placeholder="Search Product.."
              />
              <div className="flex w-12 items-center justify-center  rounded-tr-md rounded-br-md border=none bg-lime-300  text-black">
                <Search />
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
      </div> */}
      {/* <form className="mx-auto max-w-xl py-1 px-5 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
        <input type="text" placeholder="Search Product" className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic"/>
        <button className="flex flex-row items-center justify-center min-w-[120px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[35px] -mr-4" >
            Search
        </button>
      </form> */}
        <form className="max-w-[480px] w-full px-4">
            <div className="relative">
                <input type="text" name="q" className="w-full focus:outline-none border h-12 shadow p-5 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200" placeholder="Search Product..."/>
                <button type="submit">
                    <svg className="text-teal-400  h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300"
                        xmlns="http://www.w3.org/2000/svg" 
                        // xmlns:xlink="http://www.w3.org/1999/xlink" 
                        version="1.1"
                        x="0px" y="0px" viewBox="0 0 56.966 56.966"
                        // style={{"enable-background":"new 0 0 56.966 56.966"}} 
                        // xml:space="preserve"
                        >
                        <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z">
                        </path>
                    </svg>
                </button>
            </div>
        </form>

    </>
  );
};

export default SearchField;
