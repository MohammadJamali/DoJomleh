import Image from "next/image";
import Link from "next/link";
import { CSSProperties, SVGProps } from "react";
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";

export interface Feature {
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
}

export interface CardProps {
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  iconBackgroundColor?: string;
  iconColor?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconPadding?: number;
  showFooterTexture?: boolean;
  backgroundColor?: string;
  bannerImage?: string;
  href?: string;
  profilePicture?: string;
  title: string;
  description: string;
  features?: Feature[];
  footerButton?: CustomButtonProps;
  date?: Date;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  headerHeight?: number;
  headerPadding?: number;
  headerContentPadding?: number;
  loading?: "eager" | "lazy";
  priority?: boolean;
}

export default function Card({
  Icon,
  iconColor,
  iconBackgroundColor,
  iconWidth = 32,
  iconHeight = 32,
  iconPadding = 4,
  showFooterTexture = false,
  backgroundColor = "#ffffff",
  bannerImage,
  href,
  profilePicture,
  title,
  description,
  features = [],
  footerButton,
  date,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  headerHeight,
  headerPadding = 16,
  headerContentPadding,
  loading = "lazy",
  priority = false,
}: CardProps) {
  headerHeight ??= bannerImage ? 200 : undefined;
  headerContentPadding ??= bannerImage ? (headerPadding ? 16 : 8) : 24;

  const cardContainerStyle: CSSProperties = {
    backgroundColor,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  };

  const cardContent = (
    <article
      aria-labelledby={`${title.replace(/\s+/g, "-")}-title`}
      className="relative overflow-hidden rounded-xl text-left transition-shadow duration-300"
      style={{ boxShadow: showFooterTexture ? "0 4px 12px rgba(0,0,0,0.05)" : undefined }}
    >
      {showFooterTexture && (
        <>
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-20 rounded-full border-8 border-[#f8f8ff] pointer-events-none -z-10 w-[510px] h-[510px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%] rounded-full border-[16px] border-[#f8f8ff8f] pointer-events-none -z-20 w-[510px] h-[500px]"
          />
        </>
      )}

      <div className="flex flex-col">
        <div style={{ padding: `${headerPadding}px ${headerPadding}px 0` }}>
          <div
            role={bannerImage ? "img" : undefined}
            aria-label={bannerImage ? `Banner for ${title}` : undefined}
            className={`rounded-t-xl bg-cover bg-no-repeat`}
            style={{
              backgroundImage: bannerImage ? `url(${bannerImage})` : undefined,
              height: headerHeight,
              padding: headerContentPadding,
              paddingBottom: 0,
            }}
          >
            <div className="flex justify-between items-center">
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  alt={`Profile for ${title}`}
                  width={40}
                  height={40}
                  loading={loading}
                  priority={priority}
                  className="rounded-lg object-cover p-4"
                  style={{ backgroundColor: iconBackgroundColor }}
                />
              ) : Icon ? (
                <Icon
                  aria-hidden="true"
                  className="rounded-lg p-1"
                  style={{
                    backgroundColor: iconBackgroundColor,
                    color: iconColor,
                    width: iconWidth,
                    height: iconHeight,
                    padding: iconPadding,
                  }}
                />
              ) : null}

              {date && (
                <time
                  dateTime={date.toISOString()}
                  className="flex items-center h-[50px] rounded-full px-4 py-2"
                  style={{ backgroundColor: bannerImage ? "#f7f7f9bb" : "#f7f7f9" }}
                >
                  <span className="text-xs font-semibold pr-2">
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  <span className="text-xs rounded-full bg-indigo-600 px-4 py-3 text-white">
                    {date.getFullYear()}
                  </span>
                </time>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col">
          <h2
            id={`${title.replace(/\s+/g, "-")}-title`}
            className="text-2xl font-semibold text-[#13142A] mb-2"
          >
            {title}
          </h2>
          <p className="text-sm text-gray-500">{description}</p>

          {features.length > 0 && (
            <ul className="pt-8 flex flex-col gap-4 items-center w-full list-none m-0">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex gap-2 items-center bg-gray-50 px-3 py-2 rounded-xl max-w-[80%] border border-black border-opacity-5 transition-transform duration-300 ${
                    i % 2 === 0 ? "-translate-x-8" : "translate-x-8"
                  }`}
                >
                  <feature.Icon
                    aria-hidden="true"
                    className="text-indigo-600 w-6 h-6 flex-shrink-0"
                  />
                  <div className="overflow-hidden whitespace-nowrap w-full inline-block mask-gradient">
                    <strong>{feature.title}</strong>
                    {feature.description && (
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {footerButton && (
            <footer className="mt-8">
              <CustomButton
                {...footerButton}
                iconStart
                aria-label={`${footerButton.title || footerButton.label} for ${title}`}
              />
            </footer>
          )}
        </div>
      </div>
    </article>
  );

  return href ? (
    <Link
      href={href}
      aria-label={`View details for ${title}`}
      className="block max-w-[450px] rounded-xl shadow-md text-left relative overflow-hidden transition-shadow duration-300 hover:shadow-indigo-500/50"
      style={cardContainerStyle}
      passHref
    >
      {cardContent}
    </Link>
  ) : (
    <div
      role="group"
      aria-labelledby={`${title.replace(/\s+/g, "-")}-title`}
      className="max-w-[450px] rounded-xl shadow-md text-left relative overflow-hidden"
      style={cardContainerStyle}
    >
      {cardContent}
    </div>
  );
}
