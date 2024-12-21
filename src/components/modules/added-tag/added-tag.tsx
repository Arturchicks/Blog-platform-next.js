"use client";
import { Button, TextField, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { JSX } from "react";
import { AddedTagType } from "./types";

const AddedTag: React.FC<AddedTagType> = ({
  register,
  remove,
  index,
  error,
}): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  return (
    <div className="flex items-center gap-5 p-1">
      <TextField
        rows={1}
        placeholder="tag"
        size="small"
        {...register}
        error={Boolean(error)}
      />
      <Button
        variant="text"
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        sx={{
          fontSize: isMobile ? "10px" : null,
          textTransform: "capitalize",
          "&.MuiButton-root": { minWidth: "30px" },
          "& .MuiButton-startIcon": {
            margin: 0,
          },
        }}
        onClick={() => remove(index)}
      />
    </div>
  );
};
export default AddedTag;
