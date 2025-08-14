import { useState } from "react";
import RippleButton from "@/app/components/core/RippleButton";
import { Dictionary } from "@/lib/dictionary-types";
import { FaBookmark, FaEllipsis, FaHeart, FaComment, FaShare, FaFlag } from "react-icons/fa6";

export default function ArticleCard({ article, localization }: { article: any; localization: Dictionary }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <RippleButton className="rounded-lg w-full">
      <article className="flex flex-col sm:flex-row border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Image */}
        <div className="sm:flex-shrink-0 sm:max-w-[40%] w-full h-48 sm:h-auto">
          <img
            src="/images/alikhorsand1355.jpg"
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover sm:rounded-l-lg sm:rounded-t-none rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-start flex-grow text-left">
          {/* Header */}
          <header className="flex justify-between items-start mb-2 relative">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span className="font-medium">{article.user}</span>
            </div>

            <div className="relative">
              <FaEllipsis
                className="text-gray-400 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      alert("Reported!");
                      setMenuOpen(false);
                    }}
                  >
                    <FaFlag className="text-red-500" /> {localization.explore.post.report}
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Title */}
          <h2 className="font-semibold mb-2">{article.title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.content}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 text-sm mt-auto">
            <RippleButton className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 flex-shrink-0">
              <FaHeart className="text-red-500" /> {article.likes} {localization.explore.post.like}
            </RippleButton>
            <RippleButton className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 flex-shrink-0">
              <FaComment /> {localization.explore.post.comment}
            </RippleButton>
            <RippleButton className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 flex-shrink-0">
              <FaShare /> {localization.explore.post.share}
            </RippleButton>
            <RippleButton className="ml-auto flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 flex-shrink-0">
              <FaBookmark /> {localization.explore.post.bookmark}
            </RippleButton>
          </div>
        </div>
      </article>
    </RippleButton>
  );
}
