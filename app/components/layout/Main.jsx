import Container from "./Container";

export default function Main({ children, className = "", ...otherProps }) {
  return (
    <Container
      as="main"
      className={["py-4", className].join(" ")}
      {...otherProps}
    >
      {children}
    </Container>
  );
}
