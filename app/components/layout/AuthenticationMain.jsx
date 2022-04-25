export default function AuthenticationMain({
  children,
  className = "",
  ...otherProps
}) {
  return (
    <main
      className={["w-[min(420px,_100%)] mx-auto px-8 py-16", className].join(
        " "
      )}
      {...otherProps}
    >
      {children}
    </main>
  );
}
