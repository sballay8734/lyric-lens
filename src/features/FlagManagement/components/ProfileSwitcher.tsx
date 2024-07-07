import { useState } from "react";
import { FaAngleDown, FaRightLong } from "react-icons/fa6";

import {
  DEFAULT_FLAG_PROFILE_PRESETS,
  DefaultFlagPreset,
} from "../../../constants/defaultProfiles";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { setCurrentPreset } from "../redux/flagManagementSlice";

export default function ProfileSwitcher(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);

  const currentPreset = useAppSelector(
    (state: RootState) => state.flagManagement.currentPreset,
  );

  function handleProfileSelection(preset: DefaultFlagPreset) {
    setDropdownIsShown(false);

    dispatch(setCurrentPreset(preset));
  }

  return (
    <div className="dropdown dropdown-top relative w-full">
      <div className="flex min-h-12 w-full items-center justify-between gap-2 rounded-sm bg-black/40 px-2">
        <span className="text-faded col-span-2 mr-[2px] gap-2 place-self-start self-center text-sm font-thin">
          Active Profile
        </span>
        <FaRightLong size={12} className="" />
        <div
          tabIndex={0}
          role="button"
          onClick={() => setDropdownIsShown(!dropdownIsShown)}
          className="group btn pointer-events-auto h-auto min-h-6 flex-1 flex-nowrap justify-end gap-2 overflow-hidden border-none bg-transparent p-0 outline-none hover:bg-transparent"
        >
          {/* mTODO: letters like "g" and "j"'s bottoms are slightly chopped */}
          <span className="block truncate font-light text-primary transition-colors duration-200 group-hover:text-primary/70">
            {currentPreset?.presetName}
          </span>
          <FaAngleDown
            className={`flex-shrink-0 text-primary transition-colors duration-200 group-hover:text-primary/70 ${dropdownIsShown ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
            size={14}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className={`customScrollbar absolute bottom-[3.5rem] z-[998] flex max-h-96 w-full flex-col overflow-auto rounded-md bg-base-100 p-2 shadow ${dropdownIsShown ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-100`}
      >
        {DEFAULT_FLAG_PROFILE_PRESETS &&
          DEFAULT_FLAG_PROFILE_PRESETS.map((preset: DefaultFlagPreset) => {
            return (
              <li
                className={`py-5 text-sm first:rounded-t-sm last:rounded-b-sm ${preset.presetName === currentPreset?.presetName ? "bg-base-300" : "bg-base-200"} border-b-[1px] border-[#121417] transition-colors duration-100 last:border-transparent hover:bg-black focus:bg-black active:bg-black`}
                key={preset.presetId}
                onClick={() => handleProfileSelection(preset)}
              >
                <a className="rounded-sm hover:bg-black focus:bg-black active:bg-black">
                  {preset.presetName}
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
