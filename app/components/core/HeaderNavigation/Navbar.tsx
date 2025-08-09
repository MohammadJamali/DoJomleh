"use client";

import { useEffect, useState } from "react";
import getNavigationLinks from "./Links";
import { HamburgerButton } from "./components/HamburgerButton";
import { CompanyLogo } from "./components/CompanyLogo";
import { MenuLinks } from "./components/Menu/MenuLinks";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";
import { KbarInput } from "./components/KbarInput";
import { Dictionary } from '@/lib/dictionary-types';
import dynamic from "next/dynamic";

const User = dynamic(() => import("./components/User"), { ssr: false });

export const Navbar = ({ localization }: { localization: Dictionary }) => {
  // const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);
  // }, [location]);

  return (
    <>
      <nav className="flex items-center h-16 px-3 m-0 md:px-4" style={{ "backgroundColor": "#f7f7f9" }}>
        <div className="flex items-center justify-between w-full md:mx-4 lg:mx-8 2xl:w-[80em] 2xl:mx-auto">
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
            <div className="relative hidden ml-4 text-gray-600 top-[1px] md:block">
              <MenuLinks menuLinks={getNavigationLinks({localization})} />
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
           menuLinks={getNavigationLinks({localization})} 
           localization={localization}
           />}
        </div>
      </nav>
    </>
  );
};