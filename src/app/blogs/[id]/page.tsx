"use client";

import { useParams } from "next/navigation";
import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import { useBlogContents } from "@/providers/BlogContentProvider";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  const { activeBlogContent } = useBlogContents();

  const hasLocalContent =
    activeBlogContent?.id === id &&
    !!activeBlogContent?.title &&
    !!activeBlogContent?.content;

  const { data, loading, error } = useFirestoreCollection(id, hasLocalContent);

  const blog = data?.[0] ?? activeBlogContent ?? { title: "", content: "" };

  return (
    <MainContentContainer loading={loading} error={error}>

      <MarkdownView
        heading={blog.title}
        image={blog.image}
        content={blog.content}
        className="prose max-w-none overflow-scroll"
      />
    </MainContentContainer>
  );
}
