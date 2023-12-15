import { Autocomplete, Box, TextField } from "@mui/material";
import { useId } from "react";
import { useLazyGetPostsQuery } from "../services/comments";

import type { Comment } from "../services/comments";

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
      renderInput={(params) => <TextField {...params} label="Movie" />}
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
