"use client";
import { Box } from "@mui/material";

const CommentHeader: React.FC<{ length: number }> = ({ length }) => {
  return (
    <Box className="flex gap-2 items-center">
      Comments
      <span className="inline-block min-w-6 h-5 rounded-xl bg-[#1890ff] text-[12px] text-center p-[2px] text-white">
        {length}
      </span>
    </Box>
  );
};
export default CommentHeader;
