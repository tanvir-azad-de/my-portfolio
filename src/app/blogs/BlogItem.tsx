"use client";

import { useBlogContents } from "@/providers/BlogContentProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlogItem({ id, title, teaser, content, image }: FirestoreDocType) {
  const router = useRouter()
  const { handleActiveBlogContent } = useBlogContents()
  const [isPending, startTransition] = React.useTransition()

  return (
    <button
      key={id}
      disabled={isPending}
      aria-busy={isPending}
      className={`flex w-full cursor-pointer flex-col justify-between gap-4 rounded-xl border border-border/60 bg-card/60 p-4 text-left transition-colors duration-300 hover:bg-card/80 active:opacity-80 md:flex-row md:items-end ${isPending ? "pointer-events-none opacity-70" : ""}`}
      onClick={() => {
        startTransition(() => {
          handleActiveBlogContent({
            id,
            title,
            content: content || "",
            image,
          })
          router.push(`/blogs/${id}`)
        })
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Image
          src={image || "/null.webp"}
          alt={title || "Blog thumbnail"}
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-md bg-border object-cover"
        />
        <div className="min-w-0">
          <p className="mb-1 break-words font-semibold tracking-tight">{title}</p>
          <p className="line-clamp-1 break-words text-sm opacity-80">
            {isPending ? "Opening..." : teaser}
          </p>
        </div>
      </div>
    </button>
  );
}
