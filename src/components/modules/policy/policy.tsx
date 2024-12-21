"use client";
import { Checkbox } from "@mui/material";
import React, { JSX } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { PolicyType } from "./types";

export const Policy: React.FC<PolicyType> = ({
  agreeTerms,
  terms,
  submitted,
}): JSX.Element => {
  return (
    <div className="flex flex-col relative">
      <Box
        className="w-[100%] h-[1px]"
        sx={{ borderTop: "1px solid", borderColor: "text.secondary" }}
      />
      <label htmlFor="policy" />
      <div className="flex pt-2 items-center">
        <Checkbox
          id="policy"
          className={clsx(
            "max-h-[42px]",
            !terms && submitted ? "animate-bounce" : "animate-none"
          )}
          inputProps={{ style: { height: "3em" } }}
          sx={{
            "& .MuiSvgIcon-root": {
              color: !terms && submitted ? "#ef4444" : null,
            },
          }}
          color="info"
          onChange={(e) => agreeTerms((prev) => !prev)}
        />
        <span className="pt-2 text-[#595959] text-[14px]">
          I agree to the processing of my personal information and
          <a
            href="https://bump.sh/cookie-policy"
            target="_blank"
            rel="noreferrer"
            className="text-[#1890FF] underline"
          >
            Cookie Policy
          </a>
        </span>
      </div>
    </div>
  );
};
