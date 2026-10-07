import { Globe } from "@/components/ui/globe";
import { about } from "@/lib/content";
import { Button } from "./Button";
import { LiveGround } from "./LiveGround";
import { RevealIn, RevealText } from "./RevealText";

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="wrap about-layout">
        <div className="about-copy">
          <h2 id="about-heading">
            <RevealText as="span">{about.headlineLine1}</RevealText>{" "}
            <RevealText as="span" className="about-accent">
              {about.headlineLine2}
            </RevealText>
          </h2>
          <RevealIn as="p" delay={90}>
            {about.body}
          </RevealIn>
          <RevealIn delay={180}>
            <Button href={about.href} variant="ghost">
              {about.cta}
            </Button>
          </RevealIn>
        </div>
        <div className="about-globe" aria-hidden="true">
          <Globe className="about-globe-canvas max-w-none w-full" />
        </div>
      </div>
      <LiveGround />
    </section>
  );
}
