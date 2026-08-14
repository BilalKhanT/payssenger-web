import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Actions } from "@/components/sections/Actions";
import { Coverage } from "@/components/sections/Coverage";
import { Stats } from "@/components/sections/Stats";
import { Stories } from "@/components/sections/Stories";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trust />
      <Actions />
      <Coverage />
      <Stats />
      <Stories />
      <Footer />
    </main>
  );
}
