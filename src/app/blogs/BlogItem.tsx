"use client";

import { useBlogContents } from "@/providers/BlogContentProvider";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlogItem({ id, subtitle, title, teaser, content }: FirestoreDocType) {
  const router = useRouter()

  const { handleActiveBlogContent } = useBlogContents()

  return (
    <button
      key={id}
      className="bg-transparent border border-primary/20 hover:bg-primary/5 justify-between start cursor-pointer flex flex-col md:flex-row w-full p-4 rounded-xl active:scale-99 active:opacity-70"
      onClick={() =>
      {
        handleActiveBlogContent({
          title,
          content: content || ""
        })
        router.push(`blogs/${id}`)
      }
      }
    >
      <div>
        <p className="break-words text-left font-bold mb-1">{title}</p>
        <p className="text-sm text-left break-words overflow-wrap-anywhere text-primary/80 line-clamp-2">
          {teaser}
        </p>
      </div>

        <p className="text-xs text-primary text-left">
          Published on {subtitle}
        </p>
    </button>
  );
}
