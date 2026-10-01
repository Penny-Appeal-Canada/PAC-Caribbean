import {
  ArrowRight,
  ArrowsClockwise,
  Baby,
  BowlFood,
  Drop,
  FirstAid,
  HandCoins,
  Student,
} from "@phosphor-icons/react/ssr";
import { giveCards } from "@/lib/content";
import { RevealText } from "./RevealText";

const icons = {
  autogive: ArrowsClockwise,
  zakat: HandCoins,
  sponsor: Student,
  thirst: Drop,
  feed: BowlFood,
  orphan: Baby,
  emergency: FirstAid,
};

export function GiveNow() {
  return (
    <section className="give-now" id="give" aria-labelledby="give-now-heading">
      <div className="wrap">
        <div className="give-intro">
          <RevealText id="give-now-heading">
            Donate to a cause you care about
          </RevealText>
          <p className="give-lede">
            Penny Appeal Caribbean is a Muslim charity working across the
            region. We keep Zakat restricted from general funds.
          </p>
        </div>
        <div className="give-grid">
          {giveCards.map((card) => {
            const Icon = icons[card.id as keyof typeof icons];
            return (
              <a key={card.id} className="give-card" href={card.href} data-wash={card.id}>
                <img src={card.image} alt={card.alt} />
                <span className="give-wash" aria-hidden="true" />
                <span className="give-label">
                  <span className="give-label-row">
                    <Icon size={18} weight="bold" aria-hidden="true" />
                    {card.title}
                    <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </span>
                </span>
                <span className="give-reveal">
                  <Icon className="give-icon" size={46} weight="regular" aria-hidden="true" />
                  <span className="give-title">{card.title}</span>
                  <span className="give-desc">{card.lead}</span>
                  <span className="give-btn">{card.action}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
