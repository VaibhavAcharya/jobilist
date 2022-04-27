import Input from "./Input";

import Lock from "../icons/Lock";

export default function Field({
  component: Component = Input,
  id,
  label,
  optional = false,
  secret = false,
  children,
  ...otherProps
}) {
  return (
    <div className="flex-1 flex flex-col items-stretch justify-start gap-1">
      <label
        htmlFor={id}
        className="flex flex-row items-center justify-start gap-2"
      >
        <span className="font-medium text-xs uppercase whitespace-nowrap">
          {label}
        </span>
        {optional ? (
          <span className="text-xs text-neutral-400">(Optional)</span>
        ) : null}
        {secret ? <Lock size={12} className="text-neutral-400" /> : null}
      </label>

      <Component id={id} {...otherProps} />

      {children}
    </div>
  );
}
