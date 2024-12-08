import { Box, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { BaseQueryFn, TypedMutationTrigger } from "@reduxjs/toolkit/dist/query/react"
import { Profile } from "shared/redux/types"

export const SwitchComponent = (
  following: boolean,
  username: string,
  follow: TypedMutationTrigger<Profile, string, BaseQueryFn>,
  unfollow: TypedMutationTrigger<Profile, string, BaseQueryFn>
) => {
  return (
    <Box className="w-min text-center">
      {!following ? (
        <>
          Not Follow <CloseIcon sx={{ fontSize: "12px" }} />
          <Button
            onClick={() => follow(username)}
            sx={{ maxWidth: "150px", marginTop: "10px" }}
            color="success"
            variant="outlined"
            endIcon={<PersonAddAlt1Icon />}
          >
            Follow
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  )
}
