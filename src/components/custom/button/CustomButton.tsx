import { Button } from "@/components/ui/button";

type CustomButtonProps = {
   text: string;
   onClick: () => void;
   variant: 'primary' | 'secondary';
}
export default function CustomButton({ text, onClick, variant }: CustomButtonProps) {
  return (
    <Button 
    className={`font-bold  cursor-pointer shadow-none justify-start active:scale-95 active:opacity-70
      ${variant === "primary" ? "text-white hover:text-white/50 bg-secondary-foreground hover:bg-secondary-foreground" : "text-primary hover:text-primary/50 bg-transparent hover:bg-transparent border border-primary/40"}
      `}
    onClick={onClick}>{text}</Button>
  )
}