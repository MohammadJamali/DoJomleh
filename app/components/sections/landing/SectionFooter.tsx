import { CustomButton } from "../../core/CustomButton/CustomButton";
import { CompanyLogo } from "../../core/HeaderNavigation/components/CompanyLogo";
import { Dictionary } from "@/lib/dictionary-types";
import { LucideTwitterIcon } from "../../core/Icons/LucideTwitterIcon";
import { LucideYoutubeIcon } from "../../core/Icons/LucideYoutubeIcon";
import { LucideInstagramIcon } from "../../core/Icons/LucideInstagramIcon";
import { TablerBrandTelegramIcon } from "../../core/Icons/TablerBrandTelegramIcon";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SectionFooter({ localization }: { localization: Dictionary }) {
  return (
    <footer role="contentinfo" className="w-full">
      <div className="max-w-[1200px] mx-auto box-border w-full grid grid-cols-[2fr_1fr] gap-8 p-8">
        <div className="p-8 bg-[#f7f7f9] rounded-[24px] flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <CompanyLogo localization={localization} />
            <p itemProp="description">{localization.footer.contact.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="sr-only">{localization.footer.contact.stayConnected}</span>
            <div
              aria-label="Social media links"
              className="flex flex-row gap-4"
            >
              <a
                href="https://x.com/dojomleh"
                aria-label="Twitter profile"
                rel="noopener noreferrer"
                className="w-6 h-6 text-current hover:text-[#7478f8] transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <LucideTwitterIcon />
              </a>
              <a
                href="https://t.me/dojomleh"
                aria-label="Telegram channel"
                rel="noopener noreferrer"
                className="w-6 h-6 text-current hover:text-[#7478f8] transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <TablerBrandTelegramIcon />
              </a>
              <a
                href="https://www.youtube.com/@dojomleh"
                aria-label="YouTube channel"
                rel="noopener noreferrer"
                className="w-6 h-6 text-current hover:text-[#7478f8] transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <LucideYoutubeIcon />
              </a>
              <a
                href="https://www.instagram.com/dojomleh/"
                aria-label="Instagram profile"
                rel="noopener noreferrer"
                className="w-6 h-6 text-current hover:text-[#7478f8] transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <LucideInstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="p-8 bg-[#f7f7f9] rounded-[24px] flex flex-col justify-between gap-4">
          {localization.footer.buttons.map((button) => (
            <CustomButton
              key={button.name}
              href={button.href}
              title={button.name}
              Icon={ArrowUpRightIcon}
              iconStart={false}
              spacebetween
              aria-label={button.name}
            />
          ))}
        </div>
      </div>

      <span className="block border-t border-[#f0f0f1] w-full h-px" aria-hidden="true"></span>

      <div className="max-w-[1200px] mx-auto box-border p-6 flex justify-between items-center w-full">
        <p itemProp="copyrightNotice">{localization.footer.copywrite}</p>
        <ul className="flex flex-row gap-4 list-none p-0 m-0">
          <li>
            <Link href="/privacy-policy" aria-label="Privacy policy" itemProp="url" className="text-inherit no-underline hover:underline">
              {localization.footer.privacyPolicy}
            </Link>
          </li>
          <li>
            <Link href="/terms-of-use" aria-label="Terms of use" itemProp="url" className="text-inherit no-underline hover:underline">
              {localization.footer.termsOfUse}
            </Link>
          </li>
          <li>
            <Link href="/sitemap" aria-label="Site map" itemProp="url" className="text-inherit no-underline hover:underline">
              {localization.footer.siteMap}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
