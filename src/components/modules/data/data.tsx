"use client";

import { Box } from "@mui/material";
import { format } from "date-fns";
import React from "react";

const Data: React.FC<{ data: Date; className?: string }> = ({
  data,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        color: "text.secondary",
        fontSize: "12px",
      }}
    >
      {format(data, "PP")}
    </Box>
  );
};
export default Data;
