import { getDictionary } from "../../lib/get-dictionary";
import { Locale } from "../../lib/i18n-config";
import SectionCallToAction from "../components/sections/landing/SectionCallToAction";
import SectionMostViewed from "../components/sections/landing/SectionMostViewed";
import SectionStatistics from "../components/sections/landing/SectionStatistics";
import SectionChallenges from "../components/sections/landing/SectionChallenges";
import SectionSubscription from "../components/sections/landing/SectionSubscription";
import SectionFooter from "../components/sections/landing/SectionFooter";
import SectionRecentContents from "../components/sections/landing/SectionRecentContents";
import KBar from "../components/core/HeaderNavigation/KBar";
import { Navbar } from "../components/core/HeaderNavigation/Navbar";
import SectionDownload from "../components/sections/landing/SectionDownload";


export default async function Page(props: {
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