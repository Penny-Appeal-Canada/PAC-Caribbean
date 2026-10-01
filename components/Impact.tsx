import { globePins, impactStats } from "@/lib/content";
import { LiveGround } from "./LiveGround";
import { RevealText } from "./RevealText";

export function Impact() {
  return (
    <section className="section progress" aria-labelledby="progress-heading">
      <div className="wrap">
        <RevealText id="progress-heading">Our impact</RevealText>
        <p className="impact-subhead">
          Together we raised{" "}
          <span className="impact-total">
            <span className="visually-hidden">CAD </span>
            $7,672,075
          </span>{" "}
          in 2026
        </p>
        <p className="impact-updated">Last updated: August 31, 2026</p>
        <div className="progress-layout">
          <ul className="impact-funds">
            {impactStats.map((stat) => (
              <li
                key={stat.name}
                className="impact-fund"
                data-programme={stat.programme}
              >
                <p className="impact-fund-name">{stat.name}</p>
                <p className="impact-fund-amount">
                  <span className="visually-hidden">CAD </span>
                  {stat.amount}
                </p>
                <a className="impact-fund-chip" href={stat.href}>
                  Chip in
                </a>
              </li>
            ))}
          </ul>
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
      </div>
      <LiveGround />
    </section>
  );
}
