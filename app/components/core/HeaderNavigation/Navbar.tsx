"use client";

import { useEffect, useState } from "react";
import { HamburgerButton } from "./components/HamburgerButton";
import { CompanyLogo } from "./components/CompanyLogo";
import { MenuLinks } from "./components/Menu/MenuLinks";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";
import { Dictionary } from '@/lib/dictionary-types';
import dynamic from "next/dynamic";

const User = dynamic(() => import("./Wallet/User"), { ssr: false });

interface NavbarProps {
  localization: Dictionary;
  menuLinks: MenuLinks[];
  backgroundColor?: string;
  center?: boolean;
}

export const Navbar = ({ localization, menuLinks, backgroundColor, center = true }: NavbarProps) => {
  // const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);
  // }, [location]);

  return (
    <nav
      className="flex items-center h-16 px-3 m-0 md:px-4 backdrop-blur-md bg-white/30"
      style={{
        backgroundColor: backgroundColor,
        WebkitBackdropFilter: 'blur(10px)', // for Safari
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className={`flex items-center justify-between w-full ${center && "md:mx-4 lg:mx-8 2xl:w-[80em] 2xl:mx-auto"}`}>
        <div className="md:hidden">
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <div className="hidden md:block">
          <CompanyLogo localization={localization} />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative hidden md:block">
            <MenuLinks menuLinks={menuLinks} />
          </div>

          {/* <div className="hidden md:block">
              <KbarInput localization={localization} />
            </div> */}
        </div>
        <div className="absolute block transform -translate-x-1/2 md:hidden left-1/2">
          <CompanyLogo localization={localization} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <User localization={localization} />
        </div>
      </div>
      <div className="md:hidden">
        {isMobileMenuOpen && <MobileMenu
          menuLinks={menuLinks}
          localization={localization}
        />}
      </div>
    </nav >
  );
};