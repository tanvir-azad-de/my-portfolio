import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";
import MarkdownView from "@/components/custom/mainContent/MarkdownView";

export default function MdAccordion({
  image,
  title,
  subtitle,
  content,
}: Omit<FirestoreDocType, "id">) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={title || "item"}
        className="mb-4 overflow-hidden rounded-xl bg-card/60 transition-colors duration-300 data-[state=open]:bg-card/80"
      >
        <AccordionTrigger className="px-4 py-4 hover:no-underline active:opacity-80">
          <div className="flex w-full cursor-pointer flex-row items-center">
            <Image
              src={image || "/null.webp"}
              alt={title || "Accordion item"}
              priority={true}
              width={48}
              height={48}
              className="rounded-full bg-border object-cover"
            />
            <div className="ml-4 text-left leading-tight">
              <p className="font-semibold tracking-tight">
                {title}
              </p>
              <p className="mt-1 text-sm opacity-70">{subtitle}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-1">
          <MarkdownView
            content={content}
            className="prose prose-sm max-w-none overflow-auto pr-1"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
