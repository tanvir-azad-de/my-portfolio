"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LinkedinIcon, GithubIcon, DevToIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from "./Icons";
import { Link } from "lucide-react";

export const contacts = [
  {
    href: "https://linkedin.com/in/tanvirazadwork",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://github.com/Tanvirazad3449",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://dev.to/tanvir_azad",
    label: "Dev.to",
    icon: DevToIcon,
  },
  {
    href: "https://www.facebook.com/tanvirazad49",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/tanvir.azad/",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.youtube.com/@tea_with_tanvir_azad",
    label: "YouTube",
    icon: YouTubeIcon
  }
];

function UrlList() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      {contacts.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center gap-3 transition-colors hover:text-primary/60 active:scale-99 active:opacity-70"
        >
          <Icon/>
          <span>{label}</span>
        </a>
      ))}
    </div>
  )
}
export function UrlSidebar() {
  return (

    <div className="md:hidden">

      <Sheet>
        <SheetHeader className="display: hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Link size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-64 p-4 pt-14">
          <UrlList />
        </SheetContent>
      </Sheet>
    </div>

  );
}

export default function UrlBar() {

  return (
    <div className="hidden md:flex p-6 rounded-2xl border-none bg-border flex-col gap-6 sticky top-6 w-56">
      <UrlList />
    </div>
  );
}
