import { Button, TextField, useMediaQuery } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { Tag as ITag } from "../types/types"
import { ErrorMessage } from "shared/ui/error"

export const Tag: React.FC<ITag> = ({ register, remove, index, error, message }: ITag): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 480px)")
  return (
    <div className="flex items-center gap-5 p-1">
      <TextField rows={1} placeholder="tag" size="small" {...register} error={error} />
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
      ></Button>
      {error && <ErrorMessage message={message} fontsize={12} />}
    </div>
  )
}
