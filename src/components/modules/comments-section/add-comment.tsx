"use client";
import React, { JSX, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from "@mui/icons-material/Clear";
import { CSSTransition } from "react-transition-group";
import { VisuallyHiddenInput } from "@/components/UI/visibility-hidden-input";
import { useCreateCommentMutation } from "@/store/api";
import { useParams } from "next/navigation";
import { handleImg } from "@/utils/helpers/image-compress";
import { fileReset } from "@/utils/helpers/file-reset";
import { TextField } from "@mui/material";

const AddComment: React.FC<{ data: boolean }> = ({
  data: userData,
}): JSX.Element => {
  const { slug } = useParams();
  const [createComment] = useCreateCommentMutation();
  const [image, setImage] = useState<string | undefined>();
  const [showImg, setShowImg] = useState<boolean>(false);
  const imgRef = useRef(null);
  const btnRef = useRef(null);
  const { handleSubmit, reset, setValue, getValues, register, watch } =
    useForm<{
      field: string;
      body: string;
    }>({
      defaultValues: { field: "", body: "" },
    });
  const body = watch("body");
  const field = watch("field");
  const handleDeleteImg = () => {
    setShowImg(false);
    setValue("body", "");
  };
  const onSubmit = handleSubmit(async ({ field, ...comment }) => {
    const { error } = await createComment({ slug, comment });
    if (!error) {
      handleDeleteImg();
      reset();
    }
  });

  return (
    <section className="mb-5 mt-5">
      {userData && (
        <form onSubmit={onSubmit} className="relative">
          <label className="relative block">
            <TextField
              sx={{ width: "100%" }}
              multiline={true}
              rows={4}
              {...register("field")}
            />
          </label>
          <div className="flex items-center mt-2 gap-1 justify-between min-h-[37px]">
            <Button
              component="label"
              role={undefined}
              color="info"
              variant="text"
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              startIcon={<AddPhotoAlternateIcon />}
              sx={{
                "& .MuiButton-startIcon": {
                  margin: 0,
                },
                justifyContent: "center",
              }}
            >
              <VisuallyHiddenInput
                type="file"
                onFocus={fileReset}
                onChange={(e) =>
                  handleImg(e).then((url) => {
                    setValue("body", `![img](${url})`);
                    setImage(url);
                    setShowImg(true);
                  })
                }
              />
            </Button>
            <CSSTransition
              nodeRef={btnRef}
              in={Boolean(field || body)}
              classNames="display"
              timeout={400}
              unmountOnExit
            >
              <Button
                ref={btnRef}
                variant="text"
                color="info"
                type="submit"
                onClick={() =>
                  setValue("body", getValues("field").concat(getValues("body")))
                }
              >
                Submit
              </Button>
            </CSSTransition>
          </div>
          <CSSTransition
            nodeRef={imgRef}
            in={showImg}
            timeout={400}
            onExited={() => setImage(undefined)}
            classNames="display"
            unmountOnExit
          >
            <div
              className="flex gap-1 w-fit items-center animate-display relative"
              ref={imgRef}
            >
              <img
                src={image}
                className="min-w-[60px] max-h-[127px] rounded-[3px]"
                alt="avatar"
              />
              <Button
                variant="contained"
                startIcon={<ClearIcon className="text-gray-600" />}
                onClick={handleDeleteImg}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                  "&.MuiButton-root": {
                    padding: 0,
                    minWidth: "auto",
                  },
                }}
              />
            </div>
          </CSSTransition>
        </form>
      )}
    </section>
  );
};
export default AddComment;
