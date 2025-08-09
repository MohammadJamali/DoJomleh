import { CustomButton, CustomButtonProps } from "./CustomButton/CustomButton";

export interface SideBySideSplitProps {
  rightToLeft?: boolean;
  image: string;
  title: string;
  description: string;
  buttons?: CustomButtonProps[];
  containerId?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  loading?: "eager" | "lazy";
}

export default function SideBySideSplit({
  rightToLeft = false,
  image,
  title,
  description,
  buttons,
  containerId,
  imageAlt = "",
  imageWidth = 600,
  imageHeight = 400,
  loading = "lazy"
}: SideBySideSplitProps) {
  const LeftSideContainer = (
    <div
      className="w-full"
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <img
        src={image}
        alt={imageAlt || title}
        className="rounded-[3rem] object-cover p-6 bg-gradient-to-r from-[#adadfb26] to-transparent"
        width={imageWidth}
        height={imageHeight}
        loading={loading}
        decoding="async"
        itemProp="contentUrl"
      />
      {imageAlt && <meta itemProp="caption" content={imageAlt} />}
    </div>
  );

  const RightSideContainer = (
    <div
      className="w-full flex flex-col gap-4 text-center md:text-left"
      itemScope
      itemType="https://schema.org/TextDigitalDocument"
    >
      <h3 className="text-2xl whitespace-pre-wrap font-semibold" itemProp="headline">{title}</h3>
      <p
        className="text-gray-500 text-lg max-w-[600px] whitespace-pre-wrap mx-auto md:mx-0"
        itemProp="description"
      >
        {description}
      </p>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
          {buttons.map((buttonProps, index) => (
            <CustomButton
              key={index}
              {...buttonProps}
              aria-label={buttonProps.title || `Action button ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section
      id={containerId}
      className="flex flex-row gap-8 max-w-7xl w-full justify-center items-center place-self-center mx-auto px-8
                 flex-wrap md:flex-nowrap"
      itemScope
      itemType="https://schema.org/VisualArtwork"
    >
      {rightToLeft ? (
        <>
          {RightSideContainer}
          {LeftSideContainer}
        </>
      ) : (
        <>
          {LeftSideContainer}
          {RightSideContainer}
        </>
      )}
    </section>
  );
}
