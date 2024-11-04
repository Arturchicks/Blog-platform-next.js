import { Button, TextField } from "@mui/material"
import { FieldValues, UseFormRegisterReturn, UseFormUnregister } from "react-hook-form"
import { TFieldValues } from "../types/types"

interface Tag {
  key: string
  delete: (key: string, index: number) => void
  id: string
  register: UseFormRegisterReturn
  index: number
  error: boolean
  unregister: UseFormUnregister<TFieldValues>
}
export const Tag: React.FC<Tag> = (props: Tag): JSX.Element => {
  return (
    <div className="flex items-center gap-5">
      <TextField rows={1} placeholder="tag" size="small" {...props.register} error={props.error} />
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => {
          props.unregister(`tagList.${props.index}`)
          props.delete(props.id, props.index)
        }}
      >
        Delete
      </Button>
    </div>
  )
}
