import { cloneElement, forwardRef, useId } from "react";
import { FixedSizeList as List } from "react-window";
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
            //   role={role}
            height={350}
            itemCount={children.length}
            itemSize={92}
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

  return (
    <Autocomplete
      id={id}
      options={data}
      onOpen={() => !data.length && trigger()}
      sx={{ width: 500 }}
      loading={isLoading}
      ListboxComponent={VirtualizedListboxComponent}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <Box component="ul">
            {["name", "email", "body"].map((key) => (
              <li key={key}>
                {key}:{option[key as keyof Comment]}
              </li>
            ))}
          </Box>
        </li>
      )}
    />
  );
}
