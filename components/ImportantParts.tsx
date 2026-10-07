import { ArrowRight } from "@phosphor-icons/react/ssr";
import { importantParts } from "@/lib/content";
import { RevealText } from "./RevealText";

export function ImportantParts() {
  return (
    <section
      id="important"
      className="section important-parts"
      aria-labelledby="important-heading"
    >
      <div className="wrap">
        <RevealText id="important-heading">The important parts</RevealText>
        <div className="important-grid">
          {importantParts.map((item) => (
            <a key={item.href} className="important-card" href={item.href}>
              <span className="important-photo">
                <img src={item.image} alt={item.alt} />
                <span className="important-go" aria-hidden="true">
                  <ArrowRight size={20} weight="bold" />
                </span>
              </span>
              <span className="important-copy">
                <span className="important-label">{item.action}</span>
                <h3>{item.title}</h3>
                <p>{item.dek}</p>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
