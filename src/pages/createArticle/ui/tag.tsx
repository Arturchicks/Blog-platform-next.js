import React from "react"
import { Button } from "@mui/material"
import { LabeledTextarea } from "./textArea"
interface Tag {
  key: string
  delete: (key: string) => void
  id: string
}
export const Tag: React.FC<Tag> = (props): JSX.Element => {
  props
  return (
    <div className="flex items-center gap-5 p-1">
      <LabeledTextarea rows={1} placeholder="tag" width={50} />
      <Button variant="outlined" size="small" color="error" onClick={() => props.delete(props.id)}>
        Delete
      </Button>
    </div>
  )
}
