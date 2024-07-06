import { FaAngleDown, FaRightLong } from "react-icons/fa6";

export default function ProfileSwitcher(): React.JSX.Element {
  return (
    <div className="dropdown dropdown-top w-full">
      <div className="mt-2 grid w-full grid-cols-7 px-2">
        <span className="text-faded col-span-2 gap-2 place-self-start self-center text-sm">
          Current Profile
        </span>
        <FaRightLong className="col-span-1 place-self-center" />
        <div
          tabIndex={0}
          role="button"
          className="btn pointer-events-auto col-span-4 h-auto min-h-6 flex-1 flex-nowrap gap-2 place-self-end border-none bg-transparent p-0 outline-none"
        >
          <span className="flex items-center text-primary">
            3rd Grade Classroom
          </span>
          <FaAngleDown size={16} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[998] w-full rounded-md bg-base-100 p-2 shadow"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
}

// !TODO: Clicking on dropdown item cascades to "View Lyrics" Btn
// mTODO: Profile names that are too long should fade out to "..."
