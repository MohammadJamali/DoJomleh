import { getDictionary } from "../../lib/get-dictionary";
import { Locale } from "../../lib/i18n-config";
import SectionCallToAction from "../components/sections/landing/SectionCallToAction";
import SectionMostViewed from "../components/sections/landing/SectionMostViewed";
import SectionStatistics from "../components/sections/landing/SectionStatistics";
import SectionChallenges from "../components/sections/landing/SectionChallenges";
import SectionSubscription from "../components/sections/landing/SectionSubscription";
import SectionFooter from "../components/sections/landing/SectionFooter";
import SectionRecentContents from "../components/sections/landing/SectionRecentContents";
import { Navbar } from "../components/core/HeaderNavigation/Navbar";
import SectionDownload from "../components/sections/landing/SectionDownload";
import getNavigationLinks from "../components/core/HeaderNavigation/Links";
import FinisherHeader from "../components/core/FinisherHeader";


export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const localization = await getDictionary(lang);

  return  <main>
      {/* <FinisherHeader
        options={{
          count: 6,
          size: { min: 1100, max: 1300, pulse: 0 },
          // colors: { background: "#9138e5", particles: ["#6bd6ff", "#ffcb57", "#ff333d"] },
          blending: "color",
          colors: { background: "#9138e5",  particles: [ "#E8DFFF",  "#FFFFFF",  "#FFF9D6" ],  },
          // blending: "screen",
          skew: 0,
          shapes: ["c"],
        }}> */}
        <Navbar localization={localization} backgroundColor={"#f7f7f9"} menuLinks={getNavigationLinks({ localization })} />
        <SectionCallToAction localization={localization} />
      {/* </FinisherHeader> */}
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
}