import { Button, TextField } from "@mui/material"
import { UseFormRegisterReturn } from "react-hook-form"
interface Tag {
  key: string
  delete: (key: string, index: number) => void
  id: string
  register: UseFormRegisterReturn
  index: number
  error: boolean
  unregister: () => void
}
export const Tag = (props: Tag): JSX.Element => {
  return (
    <div className="flex items-center gap-5">
      <TextField rows={1} placeholder="tag" size="small" {...props.register} error={props.error} />
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => {
          props.delete(props.id, props.index)
          props.unregister()
        }}
      >
        Delete
      </Button>
    </div>
  )
}
