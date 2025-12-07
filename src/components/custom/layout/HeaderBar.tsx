"use client";

import { useSections } from "@/providers/SectionProvider";
import { UrlSidebar } from "./UrlBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { MobileNavBar } from "./NavBar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ContactIconButton from "./ContactIconButton";

type Props = {
  title: string;
  subTitle: string;
  pills: string[];
};

export default function HeaderBar({ title, subTitle, pills }: Props) {
  const { activeSection, handleActiveSection } = useSections();

  const router = useRouter()
  return (
    <header className="md:rounded-2xl sticky top-0 bg-border border border-b-primary/30 md:border-none px-2 z-50 mx-0 md:px-4 py-3 md:mb-4 flex items-center justify-between shrink-0">
      <div className="flex flex-row items-center ml-2 md:ml-0">
        <Image
          src={"/emoji.webp"}
          alt="Tanvir Azad Emoji"
          width={500}
          height={500}
          className="rounded-full bg-border border-2 border-secondary-foreground h-10 w-10"
        />
        <div className="flex flex-col ml-3">
          <h1 className="text-sm font-bold text-secondary-foreground cursor-pointer hover:text-secondary-foreground/80" onClick={() => router.push('/')}>{title}</h1>
          <p className="text-sm">{subTitle}</p>

        </div>
      </div>
      <div className="flex flex-row">
        <ContactIconButton/>
        <ThemeSwitcher />
        <UrlSidebar />
        <MobileNavBar activeSection={activeSection} onSelect={handleActiveSection} />
      </div>
    </header>
  );
}
