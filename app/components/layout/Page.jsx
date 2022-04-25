export default function Page({ children, className = "", ...otherProps }) {
  return (
    <div className={["w-full min-h-full", className].join(" ")} {...otherProps}>
      {children}
    </div>
  );
}
