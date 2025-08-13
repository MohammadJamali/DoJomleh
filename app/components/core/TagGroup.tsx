"use client";
import { useState } from "react";
import RippleButton from "./RippleButton";

type Tag = {
  label: string;
  icon?: React.ReactNode;
};

export default function TagGroup({
  title,
  tags,
}: {
  title: string;
  tags: Tag[];
}) {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState<string[]>(tags.map((t) => t.label));

  const toggleTag = (tagLabel: string) => {
    setSelected((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  const deselectAll = () => setSelected([]);

  return (
    <div className="mb-4">
      {/* Title + collapse toggle */}
      <div className="flex justify-between items-center mb-2">
        <button
          className="font-medium text-sm flex items-center gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "▼" : "▶"} {title}
        </button>
        {selected.length > 0 && (
          <button
            onClick={deselectAll}
            className="text-xs text-blue-600 hover:underline"
          >
            Deselect All
          </button>
        )}
      </div>

      {/* Tags */}
      {expanded && (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ label, icon }) => (
            <RippleButton
              key={label}
              onClick={() => toggleTag(label)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full border text-sm transition ${
                selected.includes(label)
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {icon && <span className="w-4 h-4">{icon}</span>}
              {label}
            </RippleButton>
          ))}
        </div>
      )}
    </div>
  );
}
