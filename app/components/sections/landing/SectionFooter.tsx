import { CustomButton } from "../../core/CustomButton/CustomButton";
import { CompanyLogo } from "../../core/HeaderNavigation/components/CompanyLogo";
import { Dictionary } from "@/lib/dictionary-types";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Divider from "../../core/Devider";
import { FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa6";

interface SectionFooterProps {
  localization: Dictionary;
  maxWidth?: string;
}

export default function SectionFooter({ localization, maxWidth = "1200px" }: SectionFooterProps) {
  const containerClass = `mx-auto box-border w-full max-w-[${maxWidth}]`;

  const socialLinks = [
    { href: "https://x.com/dojomleh", label: "Twitter profile", Icon: FaTwitter },
    { href: "https://t.me/dojomleh", label: "Telegram channel", Icon: FaTelegram },
    { href: "https://www.youtube.com/@dojomleh", label: "YouTube channel", Icon: FaYoutube },
    { href: "https://www.instagram.com/dojomleh/", label: "Instagram profile", Icon: FaInstagram },
  ];

  return (
    <footer role="contentinfo" className="w-full">
      {/* Top Grid */}
      <div className={`${containerClass} grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 p-6 md:p-8`}>
        
        {/* Contact + Social */}
        <div className="p-6 md:p-8 bg-[#f7f7f9] rounded-[24px] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <CompanyLogo localization={localization} />
            <p itemProp="description">{localization.footer.contact.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="sr-only">{localization.footer.contact.stayConnected}</span>
            <div aria-label="Social media links" className="flex gap-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-8 h-8 text-current hover:text-[#7478f8] transition-transform duration-200 hover:scale-110"
                >
                  <Icon size={24}/>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 md:p-8 bg-[#f7f7f9] rounded-[24px] flex flex-col gap-4">
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

      <Divider />

      {/* Bottom Bar */}
      <div className={`${containerClass} p-6 flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p itemProp="copyrightNotice">{localization.footer.copywrite}</p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <Link href="/privacy-policy" aria-label="Privacy policy" itemProp="url" className="hover:underline">
              {localization.footer.privacyPolicy}
            </Link>
          </li>
          <li>
            <Link href="/terms-of-use" aria-label="Terms of use" itemProp="url" className="hover:underline">
              {localization.footer.termsOfUse}
            </Link>
          </li>
          <li>
            <Link href="/sitemap" aria-label="Site map" itemProp="url" className="hover:underline">
              {localization.footer.siteMap}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
