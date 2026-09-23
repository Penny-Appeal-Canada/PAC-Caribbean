import { liveProgrammes } from "@/lib/content";
import { CountryFlag } from "./CountryFlag";

function Pills({ pass }: { pass: string }) {
  return (
    <>
      {liveProgrammes.map((item) => (
        <a key={`${pass}-${item.href}`} className="live-pill" href={item.href}>
          <span className="live-flag">
            <CountryFlag code={item.flag} name={item.country} />
          </span>
          <span className="live-copy">
            <span className="live-action">{item.action}</span>
            <span className="live-detail">{item.detail}</span>
          </span>
        </a>
      ))}
    </>
  );
}

export function LiveGround() {
  return (
    <section className="live-ground" aria-labelledby="live-ground-heading">
      <h2 id="live-ground-heading" className="visually-hidden">
        Programmes on the ground
      </h2>
      <div className="live-mask">
        <div className="live-track">
          <div className="live-set">
            <Pills pass="a" />
          </div>
          <div className="live-set live-dup" aria-hidden="true">
            <Pills pass="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
