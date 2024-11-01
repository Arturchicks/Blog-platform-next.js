import { Button } from "@mui/material"
import { styled } from "@mui/material"
import { blue } from "@mui/material/colors"
export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: "#1890FF",
  "&:hover": {
    backgroundColor: "#2979ff",
  },
}))
