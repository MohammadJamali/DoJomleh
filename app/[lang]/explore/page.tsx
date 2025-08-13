import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";

import Explore from "./Explore";


export default async function Page(props: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await props.params;
    const localization = await getDictionary(lang);

    return <Explore localization={localization} />;
}
