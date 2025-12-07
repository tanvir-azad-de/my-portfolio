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
    <Accordion type="single" collapsible>
      <AccordionItem value={title || ""}>
        <AccordionTrigger className="py-0 pb-6 active:scale-99 active:opacity-70">
          <div className="w-full flex flex-row items-center cursor-pointer">
            <Image
              src={image || "/null.webp"}
              alt={title || ""}
              priority={true}
              width={45}
              height={45}
              className="rounded-full bg-border border border-primary/10"
            />
            <div className="ml-4 text-left">
              <p className="font-semibold">
                {title}
              </p>
              <p className="opacity-70">{subtitle}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <MarkdownView content={content} className="prose max-w-none overflow-scroll" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
