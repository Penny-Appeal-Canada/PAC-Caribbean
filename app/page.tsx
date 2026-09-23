import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { GiveNow } from "@/components/GiveNow";
import { LiveGround } from "@/components/LiveGround";
import { WorkThrough } from "@/components/WorkThrough";
import { Impact } from "@/components/Impact";
import { ImageMarquee } from "@/components/ImageMarquee";
import { WaysIn } from "@/components/WaysIn";
import { Stories } from "@/components/Stories";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroCarousel />
        <div className="action-band">
          <LiveGround />
          <GiveNow />
        </div>
        <WorkThrough />
        <Impact />
        <ImageMarquee />
        <WaysIn />
        <Stories />
      </main>
      <SiteFooter />
    </>
  );
}
