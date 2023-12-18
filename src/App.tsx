import { Box } from "@mui/material";
import { useId } from "react";
import "./App.css";
import CommentBox from "./components/CommentBox";
import VAutocomplete from "./components/VAutocomplete";
import { useDebounce } from "./hooks/useDebounse";
import { useLazyGetPostsQuery } from "./services/comments";

function App() {
  const id = useId();
  const [trigger, { data = [], isLoading }] = useLazyGetPostsQuery();
  const search = useDebounce(trigger);

  return (
    <VAutocomplete
      id={id}
      label="Type to comments searching"
      options={data}
      loading={isLoading}
      onOpen={() => !data.length && trigger()}
      onInputChange={(_, value, reason) => {
        reason === "input" ? search(value) : trigger();
      }}
      getOptionLabel={({ name }) => name}
      renderOption={(props, option, { inputValue }) => (
        <Box
          component="li"
          {...props}
          key={option.id}
          sx={{ "&.MuiAutocomplete-option.MuiBox-root": { paddingY: 0 } }}
        >
          <CommentBox data={option} highlight={inputValue} />
        </Box>
      )}
      height={350}
      itemSize={75}
    />
  );
}

export default App;
