import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";

import Explore from "./Explore";


export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ summaryId?: string }>;
}) {
  const { lang } = await params;
  const localization = await getDictionary(lang);
  const { summaryId } = await searchParams;

  // await remark()
  //                                 .use(remarkParse)
  //                                 .use(remarkRehype)
  //                                 .use(rehypeStringify)
  //                                 .process(`
  // # React Markdown Example
  // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  
  // - Some text
  // - Some other text
  
  // ## Subtitle
  
  // This is a [link](https://github.com/remarkjs/react-markdown)
  // `.trim())).toString()

  return <Explore localization={localization} summaryId={summaryId} />;
}
