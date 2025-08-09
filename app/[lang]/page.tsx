import { getDictionary } from "../../lib/get-dictionary";
import { Locale } from "../../lib/i18n-config";
import SectionCallToAction from "../components/sections/SectionCallToAction";
import SectionMostViewed from "../components/sections/SectionMostViewed";
import SectionStatistics from "../components/sections/SectionStatistics";
import SectionChallenges from "../components/sections/SectionChallenges";
import SectionSubscription from "../components/sections/SectionSubscription";
import SectionFooter from "../components/sections/SectionFooter";
import SectionRecentContents from "../components/sections/SectionRecentContents";
import KBar from "../components/core/HeaderNavigation/KBar";
import { Navbar } from "../components/core/HeaderNavigation/Navbar";
import SectionDownload from "../components/sections/SectionDownload";


export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const localization = await getDictionary(lang);

  return <div>
    <Navbar localization={localization} />
    <main>
      <SectionCallToAction localization={localization} />
      <SectionRecentContents localization={localization} />
      <SectionChallenges localization={localization} />
      <SectionMostViewed localization={localization} />
      <SectionStatistics localization={localization} />
      <SectionDownload
        image="images/robots-banner.jpg"
        title={localization.midlevelBanner.title}
        description={localization.midlevelBanner.description}
        downloadAndroid={localization.midlevelBanner.downloadAndroid}
        downloadiOS={localization.midlevelBanner.downloadiOS}
        hrefIOS={""}
        hrefAndroid={""}
        imageAlt={""} />
      <SectionSubscription localization={localization} />
      <SectionFooter localization={localization} />
    </main>
  </div>
}