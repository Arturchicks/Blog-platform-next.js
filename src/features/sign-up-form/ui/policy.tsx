import { Checkbox } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import React from "react"
import Box from "@mui/material/Box"
export const Policy: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Box className="w-[100%] h-[1px]" sx={{ border: "1px solid", borderColor: "text.secondary" }} />
      <label htmlFor="policy" className="flex pt-2">
        <Checkbox
          id="policy"
          className="max-h-[42px]"
          inputProps={{ style: { width: `${20}em`, height: `${3}em` } }}
          color="info"
        />
        <span className="pt-2 text-[#595959] text-[14px]">I agree to the processing of my personal information</span>
      </label>
    </div>
  )
}
