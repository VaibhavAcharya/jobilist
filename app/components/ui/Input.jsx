import { DISABLED_STYLES, FOCUS_STYLES } from "../constants";

export default function Input({ className, ...otherProps }) {
  return (
    <input
      className={[
        "font-medium text-sm text-white border border-opacity-50 px-3 py-1 rounded-md",
        "border-neutral-800 bg-neutral-900 hover:border-neutral-700",
        "min-w-0 placeholder:text-neutral-400",
        DISABLED_STYLES,
        FOCUS_STYLES,
        className,
      ].join(" ")}
      {...otherProps}
    />
  );
}
