"use client";

import React, { createContext, useContext, useState } from "react";
type BlogContent = {
  id: string;
  title: string;
  content: string;
  image?: string;
}
type BlogContentContextValue = {
  activeBlogContent: BlogContent | undefined;
  handleActiveBlogContent: (text: BlogContent | undefined) => void;
};

const BlogContentContext = createContext<BlogContentContextValue | null>(null);


export function BlogContentProvider({ children }: { children: React.ReactNode }) {

  const [activeBlogContent, setActiveBlogContent] = useState<BlogContent | undefined>();

  function handleActiveBlogContent(newActiveBlogContent: BlogContent | undefined) {
    setActiveBlogContent(newActiveBlogContent)
  }

  return (
    <BlogContentContext.Provider value={{ activeBlogContent, handleActiveBlogContent }}>
      {children}
    </BlogContentContext.Provider>
  );
}

export function useBlogContents() {
  const ctx = useContext(BlogContentContext);
  if (!ctx) throw new Error("useBlogContents must be used within BlogContentProvider");
  return ctx;
}
