import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Comment } from "../services/comments";

const FIELDS: (keyof Comment)[] = ["name", "email", "body"];

type CommentBoxProps = {
  data: Comment;
  highlight?: string;
};
export default function CommentBox({ data, highlight }: CommentBoxProps) {
  const re = highlight && new RegExp(`(${highlight})`, "gi");

  return (
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
      {FIELDS.map((key) => {
        const value = data[key];
        const parts =
          typeof value === "string" && re ? value.split(re) : [value];

        return (
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
            {parts.map((part, key) => (
              <Typography
                key={key}
                component="span"
                color="tomato"
                fontWeight={
                  typeof part === "string" && re && re.test(part)
                    ? 700
                    : undefined
                }
              >
                {part}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
