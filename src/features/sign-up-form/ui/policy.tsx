import { Checkbox } from "@mui/material"
import React from "react"
import Box from "@mui/material/Box"
import { IPolicy } from "../types/types"
import clsx from "clsx"
import { ErrorMessage } from "shared/ui/error"

export const Policy: React.FC<IPolicy> = ({ agreeTerms, terms }): JSX.Element => {
  return (
    <div className="flex flex-col relative">
      <Box className="w-[100%] h-[1px]" sx={{ borderTop: "1px solid", borderColor: "text.secondary" }} />
      <label htmlFor="policy" />
      <div className="flex pt-2">
        <Checkbox
          id="policy"
          className={clsx("max-h-[42px]", !terms ? "animate-bounce" : "animate-none")}
          inputProps={{ style: { height: "3em" } }}
          sx={{
            "& .MuiSvgIcon-root": {
              color: !terms ? "#ef4444" : null,
            },
          }}
          color="info"
          onChange={(e) =>
            agreeTerms((prev) => {
              return typeof prev === "string" ? true : !prev
            })
          }
        />
        <span className="pt-2 text-[#595959] text-[14px]">
          I agree to the processing of my personal information and{" "}
          <a href="https://bump.sh/cookie-policy" target="_blank" rel="noreferrer" className="text-[#1890FF] underline">
            Cookie Policy
          </a>
        </span>
      </div>
      {!terms && <ErrorMessage message="You must agree terms of policy" />}
    </div>
  )
}
