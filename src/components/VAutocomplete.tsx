import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { cloneElement, forwardRef, useId } from "react";
import { FixedSizeList as List } from "react-window";
import { Comment, useLazyGetPostsQuery } from "../services/comments";
import { useDebounce } from "../hooks/useDebounse";

const VirtualizedListboxComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(function VirtualizedListboxComponent({ children, role, ...props }, ref) {
  return (
    <div ref={ref}>
      <div {...props}>
        {Array.isArray(children) && (
          <List
            height={350}
            itemCount={children.length}
            itemSize={75}
            width="100%"
          >
            {({ index, style }) => cloneElement(children[index], { style })}
          </List>
        )}
      </div>
    </div>
  );
});

export default function VAutocomplete() {
  const id = useId();
  const [trigger, { data = [], isLoading }] = useLazyGetPostsQuery();
  const search = useDebounce(trigger);
  return (
    <Autocomplete
      id={id}
      options={data}
      onOpen={() => !data.length && trigger()}
      sx={{ width: 700 }}
      onInputChange={(_, value, reason) => {
        switch (reason) {
          case "input":
            return search(value);
          default:
            trigger();
        }
      }}
      loading={isLoading}
      renderInput={(params) => <TextField {...params} label="Comments" />}
      getOptionLabel={({ name }) => name}
      filterOptions={(options) => options}
      ListboxComponent={VirtualizedListboxComponent}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id}
          sx={{ "&.MuiAutocomplete-option.MuiBox-root": { paddingY: 0 } }}
        >
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              paddingInlineStart: 1,
              marginBlock: 0.5,
              width: "99%",
            }}
            bgcolor="lightgray"
            borderRadius={1}
          >
            {["name", "email", "body"].map((key) => (
              <Box
                component="li"
                key={key}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                <Typography
                  component="span"
                  variant="caption"
                  color="green"
                  fontWeight={500}
                >
                  {key}:&nbsp;
                </Typography>
                <Typography component="span" color="tomato">
                  {option[key as keyof Comment]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    />
  );
}
