import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import SummaryClient from "./SummaryClient";

export default async function Summary({ params }: { params: { lang: Locale } }) {
  const localization = await getDictionary(params.lang);

  const processedContent = await remark()
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
`.trim());

  const data = {
    image: "/images/ramzali.jpg",
    banner: "/images/robots-banner.jpg",
    author: { name: "Mohammad" },
    url: localization.summary.urlLabel,
    descriptionLabel: localization.summary.descriptionLabel,
    authorLabel: localization.summary.authorLabel,
    title: localization.summary.title,
    createdAt: localization.summary.createdAt,
    reminderText: localization.summary.reminder,
    contentHtml: processedContent.toString(),
  };

  return <SummaryClient data={data} localization={localization}/>;
}
