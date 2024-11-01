import React, { createRef, forwardRef, MutableRefObject, useState } from "react"
import { Button } from "@mui/material"
import { LabeledTextarea } from "./textArea"
interface Tag {
  key: string
  delete: (key: string) => void
  id: string
}
export const Tag = React.forwardRef<HTMLTextAreaElement, Tag>((props, ref): JSX.Element => {
  return (
    <div className="flex items-center gap-5 p-1">
      <LabeledTextarea rows={1} placeholder="tag" width={50} name={props.id} ref={ref} />
      <Button variant="outlined" size="small" color="error" onClick={() => props.delete(props.id)}>
        Delete
      </Button>
    </div>
  )
})
Tag.displayName = "Tag"
