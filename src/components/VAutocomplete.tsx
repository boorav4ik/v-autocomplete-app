import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FixedSizeList as List } from "react-window";

import type { AutocompleteProps } from "@mui/material";
import { cloneElement, forwardRef } from "react";

export default function VAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  label,
  height,
  itemSize,
  ...props
}: Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
> & { label: string; height: string | number; itemSize: number }) {
  return (
    <Autocomplete
      sx={{ width: 700 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      filterOptions={(options) => options}
      ListboxComponent={forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLElement>
      >(({ children, role, ...props }, ref) => (
        <div ref={ref}>
          <div {...props}>
            {Array.isArray(children) && (
              <List
                height={height}
                itemCount={children.length}
                itemSize={itemSize}
                width="100%"
              >
                {({ index, style }) =>
                  cloneElement(children[index], {
                    ...style,
                    backgroundColor: index % 2 ? "lightgray" : undefined
                  })
                }
              </List>
            )}
          </div>
        </div>
      ))}
      {...props}
    />
  );
}
