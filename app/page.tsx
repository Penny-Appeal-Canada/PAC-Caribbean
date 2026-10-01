import { Header } from "@/components/Header";
import { QuickDonate } from "@/components/QuickDonate";
import { HeroCarousel } from "@/components/HeroCarousel";
import { GiveNow } from "@/components/GiveNow";
import { Impact } from "@/components/Impact";
import { ImageMarquee } from "@/components/ImageMarquee";
import { TakeAction } from "@/components/TakeAction";
import { WaysIn } from "@/components/WaysIn";
import { ImportantParts } from "@/components/ImportantParts";
import { Stories } from "@/components/Stories";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <QuickDonate />
      <Header />
      <main id="main">
        <HeroCarousel />
        <div className="action-band">
          <GiveNow />
        </div>
        <Impact />
        <ImageMarquee />
        <TakeAction />
        <WaysIn />
        <ImportantParts />
        <Stories />
      </main>
      <SiteFooter />
    </>
  );
}
