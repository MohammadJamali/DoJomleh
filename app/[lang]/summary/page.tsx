import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import SummaryView  from "./SummaryView";

export default async function Page(
  props: {params: Promise<{ lang: Locale }>},
  id: string 
) {
  const { lang } = await props.params;
  const localization = await getDictionary(lang);

  return <SummaryView  data={{
    image: "/images/ramzali.jpg",
    banner: "/images/robots-banner.jpg",
    author: { name: "Mohammad" },
    url: localization.summary.urlLabel,
    descriptionLabel: localization.summary.abstractLabel,
    authorLabel: localization.summary.authorLabel,
    title: localization.summary.title,
    createdAt: localization.summary.createdAt,
    reminderText: localization.summary.reminder,
    contentHtml: (await remark()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(`
# React Markdown Example
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- Some text
- Some other text

## Subtitle

This is a [link](https://github.com/remarkjs/react-markdown)
`.trim())).toString(),
  }} localization={localization} id={id} />;
}
