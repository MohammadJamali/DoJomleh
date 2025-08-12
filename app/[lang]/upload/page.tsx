// app/upload/page.tsx
import { getDictionary } from "@/lib/get-dictionary";
import UploadCard from "./UploadCard";
import { Locale } from "@/lib/i18n-config";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const localization = await getDictionary(params.lang);
  
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
