import { getDictionary } from "../../lib/get-dictionary";
import { Locale } from "../../lib/i18n-config";
import SectionCallToAction from "../components/sections/CallToAction/SectionCallToAction";
import SectionNews from "../components/sections/News/SectionNews";
import StatsSection from "../components/sections/Statistics/SectionStatistics";
import SectionWhoWeServe from "../components/sections/WhoWeServe/SectionWhoWeServe";
import SectionTopNews from "../components/sections/TopNews/SectionTopNews";
import SectionSubscription from "../components/sections/Subscription/SectionSubscription";
import SectionFooter from "../components/sections/Footer/SectionFooter";
import SectionCards from "../components/sections/Cards/SectionCards";
import KBar from "../components/core/HeaderNavigation/KBar";
import { Navbar } from "../components/core/HeaderNavigation/Navbar";


export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const localization = await getDictionary(lang);

  return (
      <KBar>
        <Navbar localization={localization}/>
        <main>
          <SectionCallToAction localization={localization}/>
          <StatsSection localization={localization}/>
          <SectionWhoWeServe />
          <SectionTopNews
            image="https://picsum.photos/id/191/1200/600"
            title={"Lorem ipsum is placeholder"}
            description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
            linkText={"Learn more"}
            href={"#"} />
          <SectionNews />
          <SectionCards />
          <SectionSubscription localization={localization}/>
          <SectionFooter localization={localization}/>
        </main>
      </KBar>
  )
}