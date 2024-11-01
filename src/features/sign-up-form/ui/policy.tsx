import { Checkbox } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import React from "react"
export const Policy: React.FC = () => {
  return (
    <div className="flex flex-col">
      <span className="w-[100%] inline-block h-[1px] border border-[#E8E8E8]" />
      <label htmlFor="policy" className="flex pt-2">
        <Checkbox id="policy" className="max-h-[42px]" />
        <span className="pt-2 text-[#595959] text-[14px]">I agree to the processing of my personal information</span>
      </label>
    </div>
  )
}
