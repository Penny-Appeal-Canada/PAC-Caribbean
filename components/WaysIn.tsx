import { Button } from "./Button";
import { RevealIn, RevealText } from "./RevealText";

export function WaysIn() {
  return (
    <section id="zakat" className="join-band">
      <div className="wrap">
        <RevealText>Zakat, kept restricted</RevealText>
        <RevealIn as="p" delay={90}>
          Thirst Relief, Feed Our World, and OrphanKind. We do not mix it with
          general funds.
        </RevealIn>
        <Button href="/zakat" programme="emergency">
          Calculate Zakat
        </Button>
      </div>
    </section>
  );
}
