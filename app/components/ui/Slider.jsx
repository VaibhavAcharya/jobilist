import { useState } from "react";

import * as Slider from "@radix-ui/react-slider";

import { DISABLED_STYLES, FOCUS_STYLES } from "../constants";

export default function _Slider({
  id,
  name,
  className = "",
  onChange,
  ...otherProps
}) {
  const [value, setValue] = useState(
    otherProps?.defaultValue?.[0] ?? otherProps?.min ?? 0
  );

  return (
      <Slider.Root
      id={id}
      name={name}
        className={[
          "relative w-full h-8 flex flex-row items-center justify-start touch-none",
          className,
        ].join(" ")}
        onValueChange={function (value) {
          setValue(value[0]);
          onChange?.(value[0]);
        }}
        {...otherProps}
      >
        <Slider.Track className="relative h-2 w-full rounded-md bg-neutral-800">
          <Slider.Range className="absolute h-2 rounded-md bg-blue-500" />
        </Slider.Track>

        <Slider.Thumb
          className={[
            "h-8 w-8 rounded-md bg-neutral-900 border border-opacity-50 border-neutral-800 hover:border-neutral-700 flex flex-row items-center justify-center font-medium text-sm",
            FOCUS_STYLES,
            DISABLED_STYLES
          ].join(" ")}
        >
          {value}
        </Slider.Thumb>
      </Slider.Root>
  );
}
