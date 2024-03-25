import { TextField } from "@radix-ui/themes";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const Search = ({handleFilter, placeholder}) => {
  return (
    <TextField.Root className="w-80">
      <TextField.Slot>
        <FaMagnifyingGlass height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder={placeholder} onChange={(e)=>handleFilter(e.target.value)}/>
    </TextField.Root>
  );
};
