import { Fragment, useState } from "react";

import { Switch } from "@headlessui/react";

import { FOCUS_STYLES } from "../constants";

export default function _Switch({
  id,
  name,
  defaultEnabled = false,
  ...otherProps
}) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <Fragment>
      <input
        id={id}
        name={name}
        type="hidden"
        value={enabled}
        {...otherProps}
      />

      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={[
          "relative flex flex-row items-center px-2 py-1 rounded-md w-14 bg-neutral-900 border border-neutral-800 hover:border-neutral-700",
          enabled ? "justify-end" : "justify-start",
          FOCUS_STYLES,
        ].join(" ")}
      >
        <span
          className={[
            "w-5 h-5 rounded-md",
            enabled ? "bg-blue-500" : "bg-white",
          ].join(" ")}
        />
      </Switch>
    </Fragment>
  );
}
