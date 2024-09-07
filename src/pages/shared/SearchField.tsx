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
      <div className=" border md:flex items-center justify-center">
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex ">
              <Input
                type="text"
                className="  bg-white  focus:border-none border-none text-black pl-2 text-base outline-0"
                placeholder=""
                id=""
              />
              <div className="flex w-10 items-center justify-center rounded-tl-md rounded-bl-md border-l border-gray-200  text-black">
                <Search />
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};

export default SearchField;
