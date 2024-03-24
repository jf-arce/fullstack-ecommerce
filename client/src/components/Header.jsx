import { TextField } from "@radix-ui/themes";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header className="flex items-center gap-6 justify-between bg-neutral-900 py-5 px-8 border-l-[1px] border-neutral-700">
      <TextField.Root className="w-80">
        <TextField.Slot>
          <FaMagnifyingGlass height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Search the docs…" />
      </TextField.Root>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};
