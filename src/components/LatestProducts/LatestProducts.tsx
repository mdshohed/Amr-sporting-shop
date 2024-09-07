import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const LatestProducts = () => {
  return (
    <div>
      <div className="p-5 text-center">
         <HoverCard>
          <HoverCardTrigger>Hover</HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
      </div>
      
    </div>
  );
};

export default LatestProducts;