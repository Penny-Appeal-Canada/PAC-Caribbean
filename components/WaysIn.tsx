import { programmes } from "@/lib/content";
import { Button } from "./Button";

export function WaysIn() {
  const featured = programmes[0];

  return (
    <>
      <section id="zakat" className="section take-today">
        <div className="wrap">
          <h2>Take action today</h2>
          <a className="campaign" href={featured.href}>
            <img src={featured.workImage} alt={featured.workAlt} />
            <div className="campaign-copy">
              <p className="happen-cat" data-programme={featured.id}>
                {featured.name}
              </p>
              <h3>{featured.statement}</h3>
              <p>From {featured.entryAmount}, or local equivalent in TTD, JMD, GYD, XCD, CAD.</p>
              <span className="btn" data-programme={featured.id}>
                Support Thirst Relief
              </span>
            </div>
          </a>
        </div>
      </section>
      <section className="join-band">
        <div className="wrap">
          <h2>Zakat, kept restricted</h2>
          <p>
            Thirst Relief, Feed Our World, and OrphanKind. We do not mix it with general funds.
          </p>
          <Button href="/zakat" programme="emergency">
            Calculate Zakat
          </Button>
        </div>
      </section>
    </>
  );
}
