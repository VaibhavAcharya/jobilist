export default function AuthenticationMain({ children, className = "", ...otherProps }) {
  return (
    <main className={["w-[min(420px,_100%)] min-h-[80vh] mx-auto px-4 py-8", className].join(" ")} {...otherProps}>
      {children}
    </main>
  );
}
