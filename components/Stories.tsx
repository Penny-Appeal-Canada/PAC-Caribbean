import { stories } from "@/lib/content";
import { RevealIn, RevealText } from "./RevealText";

export function Stories() {
  return (
    <section id="news" className="section trending">
      <div className="wrap">
        <RevealText>From the countries we work in</RevealText>
        <div className="stories-layout">
          <a className="featured-story" href={stories.featured.href}>
            <img src={stories.featured.image} alt={stories.featured.alt} />
            <p className="story-place">{stories.featured.place}</p>
            <RevealText as="h3">{stories.featured.title}</RevealText>
            <RevealIn as="p" delay={90}>
              {stories.featured.dek}
            </RevealIn>
          </a>
          <div className="story-list">
            {stories.list.map((story) => (
              <a key={story.href} href={story.href}>
                <img src={story.image} alt={story.alt} />
                <span>
                  <p className="story-place">{story.place}</p>
                  <h3>{story.title}</h3>
                  <p>{story.dek}</p>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
