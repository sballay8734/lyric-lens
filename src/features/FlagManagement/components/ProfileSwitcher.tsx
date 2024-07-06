import { useState } from "react";
import { FaAngleDown, FaRightLong } from "react-icons/fa6";

type TestProfile =
  | "Grade 11 Classroom"
  | "Grade 3 Classroom"
  | "Church Group"
  | "Default";

const testProfiles: TestProfile[] = [
  "Grade 11 Classroom",
  "Grade 3 Classroom",
  "Church Group",
  "Default",
];

export default function ProfileSwitcher(): React.JSX.Element {
  const [flagProfile, setFlagProfile] = useState<TestProfile>("Default");
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);

  function handleProfileSelection(profile: TestProfile) {
    setFlagProfile(profile);
  }

  return (
    <div className="dropdown dropdown-top w-full">
      <div className="mt-2 flex w-full items-center justify-between gap-2 px-2">
        <span className="text-faded col-span-2 mr-[2px] gap-2 place-self-start self-center text-sm">
          Current Profile
        </span>
        <FaRightLong size={14} className="" />
        <div
          tabIndex={0}
          role="button"
          className="group btn pointer-events-auto h-auto min-h-6 flex-1 flex-nowrap justify-end gap-2 overflow-hidden border-none bg-transparent p-0 outline-none hover:bg-transparent"
        >
          <span className="block truncate text-primary transition-colors duration-200 group-hover:text-primary/70">
            {flagProfile}
          </span>
          <FaAngleDown
            className="flex-shrink-0 text-primary transition-colors duration-200 group-hover:text-primary/70"
            size={14}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[998] w-full rounded-md bg-base-100 p-2 shadow"
      >
        {testProfiles &&
          testProfiles.map((profile: TestProfile) => {
            return (
              <li
                className={`${profile === flagProfile ? "bg-base-300" : ""} rounded-sm transition-colors duration-100 hover:bg-black focus:bg-black active:bg-black`}
                key={profile}
                onClick={() => handleProfileSelection(profile)}
              >
                <a className="rounded-sm hover:bg-black focus:bg-black active:bg-black">
                  {profile}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

// !TODO: Clicking on dropdown item cascades to "View Lyrics" Btn
// mTODO: Arrow should more central on larger screens
// mTODO: Profile and icon div are expanding the full width which causes weird pointer event behavior
