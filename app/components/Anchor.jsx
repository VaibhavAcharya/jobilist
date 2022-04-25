import { FOCUS_STYLES } from "./constants";

export default function Anchor({
  children,
  className = "",
  styled = true,
  ...otherProps
}) {
  return (
    <a
      className={[styled ? "" : null, FOCUS_STYLES, className].join(" ")}
      {...otherProps}
    >
      {children}
    </a>
  );
}
