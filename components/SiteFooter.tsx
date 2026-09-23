import { programmes } from "@/lib/content";
import { Button } from "./Button";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-support">
          <h2>Support the work</h2>
          <Button href="/donate">Donate</Button>
        </div>
        <div className="footer-grid">
          <div>
            <p className="footer-label">Penny Appeal Caribbean</p>
            <p>
              Contact: [PLACEHOLDER]
              <br />
              Charity number: [PLACEHOLDER]
            </p>
          </div>
          <div>
            <p className="footer-label">Programmes</p>
            <ul>
              {programmes.map((programme) => (
                <li key={programme.id}>
                  <a href={programme.href}>{programme.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-label">Get involved</p>
            <ul>
              <li>
                <a href="/zakat">Zakat</a>
              </li>
              <li>
                <a href="/give-monthly">Give monthly</a>
              </li>
              <li>
                <a href="/volunteer">Volunteer</a>
              </li>
              <li>
                <a href="/news">News</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-label">Legal</p>
            <ul>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
            </ul>
            <p className="footer-currencies">
              Currencies we accept include TTD, JMD, GYD, XCD, USD, and CAD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
