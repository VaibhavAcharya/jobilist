import { Fragment, useState } from "react";

import { Listbox } from "@headlessui/react";
import Button from "./Button";

export default function Select({
  id,
  name,
  options = [],
  defaultOption,
  onChange,
  ...otherProps
}) {
  const [option, setOption] = useState(defaultOption);

  return (
    <Fragment>
      <input
        id={id}
        name={name}
        type="hidden"
        value={option.value}
        {...otherProps}
      />

      <Listbox
        value={option}
        onChange={function (option) {
          setOption(option);
          onChange?.(option);
        }}
      >
        <div className="flex-1 relative">
          <Listbox.Button
            as={Button}
            type="button"
            className="relative w-full flex flex-row items-center justify-start"
            ghost
          >
            {option.label}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-md divide-y divide-dashed divide-neutral-800 focus:outline-none">
            {options.map(function (_option) {
              return (
                <Listbox.Option
                  value={_option}
                  className={function ({ active, selected }) {
                    return [
                      "relative w-full px-3 py-1 font-medium text-sm rounded-md",
                      active ? "bg-neutral-800" : "",
                      selected ? "text-blue-500" : "",
                    ].join(" ");
                  }}
                  key={_option.value}
                >
                  {_option.label}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
    </Fragment>
  );
}
