import { useTheme } from "@emotion/react";
import { Box, Button, Theme } from "@mui/material";
import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  JSX,
} from "react";

const PopConfirm: ForwardRefExoticComponent<{
  del: () => void;
  ref: ForwardedRef<unknown>;
}> = forwardRef(({ del }, ref): JSX.Element => {
  const theme = useTheme() as Theme;
  return (
    <Box
      className="rounded flex flex-col absolute bottom-[-95px] right-[90px] text-[12px] p-2"
      ref={ref}
      sx={{
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "text.primary",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: "20px",
          height: "20px",
          transform: "rotate(45deg)",
          borderTopLeftRadius: "4px",
          border: "1px solid transparent",
          borderTopColor: "text.primary",
          borderLeftColor: "text.primary",
          position: "absolute",
          right: "40px",
          top: "-10.5px",
          zIndex: 0,
          bgcolor: "background.default",
        }}
      />
      Are you sure to delete this article?
      <Box className="flex gap-3 justify-center">
        <Button color="info" variant="text" onClick={del}>
          Yes
        </Button>
        <Button color="info" variant="text">
          No
        </Button>
      </Box>
    </Box>
  );
});
export default PopConfirm;
PopConfirm.displayName = "PopConfirm";
