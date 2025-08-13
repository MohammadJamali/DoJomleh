// app/upload/page.tsx
import { getDictionary } from "@/lib/get-dictionary";
import UploadCard from "./UploadCard";
import { Locale } from "@/lib/i18n-config";

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const localization = await getDictionary(lang);
  
  const data = {
    image: "/images/form-screenshot.jpg", // see instructions below
    banner: "", // optional
    author: { name: "Mohammad" },
    urlLabel: "URL",
    descriptionLabel: "Description",
    authorLabel: "Author",
    title: "Upload a New Project",
    createdAt: "Today",
    reminderText: "Set reminder",
    contentHtml: "<p>Example content</p>",
  };

  return <UploadCard data={data} localization={localization} />;
}
