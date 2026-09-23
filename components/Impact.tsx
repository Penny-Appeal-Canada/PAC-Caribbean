import { globePins, impactStats } from "@/lib/content";
import { ArrowRight } from "@phosphor-icons/react/ssr";

export function Impact() {
  return (
    <section className="section progress" aria-labelledby="progress-heading">
      <div className="wrap">
        <h2 id="progress-heading">Our progress</h2>
        <div className="progress-layout">
          <div className="progress-copy">
            <p className="progress-lead">
              How we have made an impact together
            </p>
            <p>
              Partners in Belize, Guyana, Jamaica, Suriname, and Trinidad. Pins mark places we name, not a claim of global reach.
            </p>
            <a className="link-arrow" href="/about">
              Learn more
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="globe-bleed" aria-hidden="true">
            <div className="globe-stage">
              <div className="orbit-ring" />
              <div className="globe-spin">
                <img
                  src="/images/globe-caribbean.jpg"
                  alt=""
                  width={800}
                  height={800}
                />
                {globePins.map((pin) => (
                  <span
                    key={pin.id}
                    className="pin"
                    data-programme={pin.programme}
                    style={{ left: pin.x, top: pin.y }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul className="visually-hidden">
          {globePins.map((pin) => (
            <li key={pin.id}>{pin.name}</li>
          ))}
        </ul>
        <div className="stats">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
