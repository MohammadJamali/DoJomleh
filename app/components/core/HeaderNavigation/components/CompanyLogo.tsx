import { Dictionary } from '@/lib/dictionary-types';
import Link from 'next/link'

interface CompanyLogoProps {localization: Dictionary}

export const CompanyLogo = ({localization}: CompanyLogoProps) => {
  return (
    <Link href="/" className="flex items-center">
      <span className="self-center text-xl font-bold text-gray-600 whitespace-nowrap hover:text-gray-800 ">
        {localization.app.name}
      </span>
    </Link>
  );
};
