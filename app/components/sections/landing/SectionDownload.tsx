import { CustomButton } from "../../core/CustomButton/CustomButton";
import Head from "next/head";
import { FaApple, FaAndroid } from "react-icons/fa";

interface SectionDownloadProps {
  title: string;
  description: string;
  downloadiOS: string;
  downloadAndroid: string;
  hrefIOS: string;
  hrefAndroid: string;
  image: string;
  imageAlt: string;
}

export default function SectionDownload({
  title,
  description,
  downloadiOS,
  downloadAndroid,
  hrefIOS,
  hrefAndroid,
  image,
  imageAlt,
}: SectionDownloadProps) {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="flex flex-col items-center justify-start gap-8 w-full px-4 pt-24 pb-24"
    >
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        width={500}
        height={300}
        className="rounded-[3rem] w-full max-w-[1200px] p-6
          bg-gradient-to-r from-[#adadfb26] to-[#adadfb00]"
      />

      <h3
        id="download-heading"
        className="text-2xl whitespace-pre-wrap text-center"
      >
        {title}
      </h3>

      <p
        className="text-[#737377] text-lg max-w-[600px] whitespace-pre-wrap text-center"
      >
        {description}
      </p>

      <div className="flex flex-row gap-4">
        <CustomButton
          iconStart={false}
          title={downloadiOS}
          href={hrefIOS}
          color={0xfff}
          backgroundColor={0x7478F8}
          iconBackgroundColor={0xfff}
          Icon={FaApple}
          aria-label={`Download ${title} for iOS`}
        />

        <CustomButton
          iconStart={false}
          title={downloadAndroid}
          href={hrefAndroid}
          color={0xfff}
          backgroundColor={0x7478F8}
          iconBackgroundColor={0xfff}
          Icon={FaAndroid}
          aria-label={`Download ${title} for Android`}
        />
      </div>
    </section>
  );
}
