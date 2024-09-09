import { Bell } from 'lucide-react';
import { Search } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Notification = () => {
  return (
    <div >
      <HoverCard>
        <HoverCardTrigger className=' '>
          <Bell />
        </HoverCardTrigger>
        <HoverCardContent>
          <h1>Notifications</h1>
          <p>You have no notifications.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Notification;