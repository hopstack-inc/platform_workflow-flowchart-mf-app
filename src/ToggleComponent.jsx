import React from "react";
import { Switch } from "@headlessui/react";

const ToggleComponent = ({ enabled, setEnabled, disabled }) => {
  let onChange;
  if (disabled === undefined || !disabled) {
    onChange = setEnabled;
  } else if (disabled) {
    onChange = () => {
      /* set to empty if button is disabled */
    };
  }
  return (
    <div className="py-1">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${!!disabled ? "bg-opacity-30" : ""} ${
          enabled ? "bg-blue-800" : "bg-green-500"
        }
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

export default ToggleComponent;