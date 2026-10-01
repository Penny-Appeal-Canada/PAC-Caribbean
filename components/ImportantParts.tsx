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
            <a
              key={item.href}
              className="important-card"
              href={item.href}
              data-weight={item.weight}
              data-tone={item.tone}
            >
              <h3>{item.title}</h3>
              <p>{item.dek}</p>
              <span className="btn">{item.action}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
