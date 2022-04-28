import Anchor from "../ui/Anchor";
import Container from "./Container";

export default function Footer() {
  return (
    <div className="border-t border-neutral-800/50 bg-white/5 py-4 flex flex-col items-stretch justify-start">
      <Container
        as="footer"
        className="flex flex-col items-stretch justify-start gap-4"
      >
        <p className="text-sm text-center text-neutral-400">
          Build by{" "}
          <Anchor
            href="https://twitter.com/VaibhavAcharya_"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaibhav Acharya
          </Anchor>{" "}
          and{" "}
          <Anchor
            href="https://twitter.com/naman404"
            target="_blank"
            rel="noopener noreferrer"
          >
            Naman Vyas
          </Anchor>
          .
        </p>
      </Container>
    </div>
  );
}
