import { Globe } from "@/components/ui/globe";
import { impactStats } from "@/lib/content";
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
        <p className="globe-places">
          Jordan, Palestine, Sudan, Pakistan, Turkey, India, Canada, and the
          Caribbean
        </p>
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
          <div className="globe-bleed">
            <div className="globe-stage">
              <Globe className="globe-canvas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
