import FlagSelect from "../components/FlagSelect/FlagSelect";

import { mockUser } from "../data/mockUser";

export default function ManageFlags(): React.JSX.Element {
  return (
    <div className="h-full w-full p-4 flex flex-col">
      <div className="header flex flex-col gap-2">
        <h1 className="text-xl font-bold">Flag Manager</h1>
        <p className="text-neutral-content/50">
          Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dignissimos nostrum, molestias id cupiditate corrupti voluptatibus
          animi nulla quod quae numquam enim, eligendi facere sunt, at quidem!
          Error similique explicabo dolore.
        </p>
        <div className="divider"></div>
        <div className="h-full">
          <FlagSelect user={mockUser} />
        </div>
      </div>
    </div>
  );
}

// !TODO: Overflow not set up correctly (Only the words should scroll -- header should remain at top)
// !TODO I think the btmSheet is blocking gestures
