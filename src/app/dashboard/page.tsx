import { ListMyCourses } from "@/components/lists/list-my-courses";
import { ListWatchAgain } from "@/components/lists/list-watch-again";
import { SliderAdvertising } from "@/components/slider-advertising";

import { AppLayout } from "@/layout/app-layout";

export default function HomePage() {
  return (
    <AppLayout itemActive="home">
      <section className="w-full  h-[530px] relative shadow-video">
        <SliderAdvertising
          description="Explore o maior ecossistema de comunidades do Brasil"
          isButton={true}
        />
      </section>

      <main className="block p-14">
        <ListWatchAgain />
        <ListMyCourses />
      </main>
    </AppLayout>
  );
}
