import { stories } from "@/lib/content";

export function Stories() {
  return (
    <section id="news" className="section trending">
      <div className="wrap">
        <h2>From the countries we work in</h2>
        <div className="stories-layout">
          <a className="featured-story" href={stories.featured.href}>
            <img src={stories.featured.image} alt={stories.featured.alt} />
            <p className="story-place">{stories.featured.place}</p>
            <h3>{stories.featured.title}</h3>
            <p>{stories.featured.dek}</p>
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
