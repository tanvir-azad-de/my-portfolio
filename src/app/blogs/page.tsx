"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import BlogItem from "./BlogItem";
import { MainContentHeaderButton } from "@/components/custom/mainContent/MainContentHeader";
import { ArrowRight } from "lucide-react";
import { contacts } from "@/components/custom/layout/UrlBar";

export default function Blogs() {
    const { data, loading, error } = useFirestoreCollection();

    return (
        <MainContentContainer loading={loading} error={error}>
            <div className="flex flex-col gap-4 pb-6">
                {data.map((blog) => (
                    <BlogItem
                        key={blog.id}
                        id={blog.id}
                        subtitle={blog.subtitle}
                        title={blog.title}
                        teaser={blog.teaser}
                        content={blog.content}
                        image={blog.image}
                    />
                ))}

                {data?.length > 0 && <div
                    className="bg-transparent border border-primary/20 hover:bg-primary/5 justify-between start cursor-pointer flex flex-col md:flex-row w-full py-4 pl-4 rounded-xl active:scale-99 active:opacity-70"
                    onClick={() => {
                        window.open(contacts[2].href, "_blank", "noopener,noreferrer")
                    }}
                >
                    <div className={`w-full flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 shadow-none`}>
                        <div className="flex-1 min-w-0">
                            <p className="break-words">Read all my blogs on dev.to</p>
                        </div>
                        <div className="shrink-0 md:ml-auto text-left md:text-right mr-1">
                            <MainContentHeaderButton rightIconComponent={<ArrowRight size={24} />} label="Open External Link" onClick={() => null} />
                        </div>
                    </div>
                </div>
                }
            </div>
        </MainContentContainer>
    );
}

