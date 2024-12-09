import { Box, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import React from "react"
import { SwitchTypes } from "pages/UserPage/types/types"

export const SwitchComponent: React.FC<SwitchTypes> = ({ following, username, follow, unfollow }) => {
  return (
    <Box className="w-min text-center">
      {!following ? (
        <React.Fragment>
          Not following <CloseIcon sx={{ fontSize: "12px" }} />
          <Button
            onClick={() => follow(username)}
            sx={{ maxWidth: "150px", marginTop: "10px" }}
            color="success"
            variant="outlined"
            endIcon={<PersonAddAlt1Icon />}
          >
            Follow
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          You are following {<DoneIcon sx={{ fontSize: "12px" }} />}
          <Button
            onClick={() => unfollow(username)}
            sx={{ maxWidth: "150px", marginTop: "10px" }}
            color="error"
            variant="outlined"
            endIcon={<PersonRemoveIcon />}
          >
            Unfollow
          </Button>
        </React.Fragment>
      )}
    </Box>
  )
}
