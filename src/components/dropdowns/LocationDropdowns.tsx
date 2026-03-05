import { TopWorldCities } from "../../../data/countries";

("use client");

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export function LocationDropdowns({ location, setLocation }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(location);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between">
          {value || "Select City"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0 z-1001">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No city found.</CommandEmpty>

            <CommandGroup>
              {TopWorldCities.map((city, idx) => (
                <CommandItem
                  key={idx}
                  value={city}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    setLocation(city);
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === city ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {city}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
