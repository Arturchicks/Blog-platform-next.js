import { useTheme } from "@emotion/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, CircularProgress, Theme, useMediaQuery } from "@mui/material"
import clsx from "clsx"
import { Fields } from "pages/createArticle/types/types"
import { Tag } from "pages/createArticle/ui/tag"
import { schema } from "pages/createArticle/utils/schema"
import React, { createRef, Ref, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useGetArticleQuery, useUpdateArticleMutation } from "shared/redux/api"
import { FormField } from "shared/ui/form-field/form-field"
import { ColorButton } from "shared/ui/signButton"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import { nanoid } from "nanoid"
import ClearIcon from "@mui/icons-material/Clear"
import { VisuallyHiddenInput } from "pages/EditUser/ui/visibilityHiddenInput"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { Portal } from "shared/ui/Portal/portal"
import { handleImg } from "shared/lib/handleImage"

const EditArticle: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(String(slug))
  const [firstRender, setFirstRender] = useState<boolean>(true)
  const theme = useTheme() as Theme
  const [image, setImage] = useState<string | undefined>()
  const [portalOpen, setPortalOpen] = useState<boolean>(false)
  const [body, setBody] = useState<string>()
  const [showImg, setShowImg] = useState<boolean>(false)
  const imgRef = useRef()
  const [update] = useUpdateArticleMutation()
  const isMobile = useMediaQuery("(max-width: 480px)")
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Fields>({ resolver: yupResolver(schema) })
  const { append, remove, fields } = useFieldArray({
    name: "tagList",
    control,
    shouldUnregister: true,
  })
  const handleDelete = (index: number) => {
    remove(index)
    setFirstRender(false)
  }
  const onSubmit = handleSubmit(async (data) => {
    const tags = data.tagList?.map(({ tag }) => tag)
    const { body, ...restData } = data
    const { error } = await update({
      slug,
      data: { body: image ? `${body} ![img](${image})` : body, ...restData, tagList: tags },
    })
    if (!error) navigate("/articles")
  })
  const regex = /!\[img\](.*)/
  const handleClick = () => setPortalOpen(false)

  useEffect(() => {
    if (portalOpen) document.getElementById("root")?.classList.add("brightness")
    else document.getElementById("root")?.classList.remove("brightness")
  }, [portalOpen])

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    if (data?.article.tagList) data.article.tagList.map((e) => append({ tag: e }))
    if (data?.article.body) {
      if (regex.test(data?.article.body)) {
        const match = data.article.body.match(regex)
        if (match) {
          const splitted = data.article.body.split(" ")
          splitted.pop()
          const splittedBody = splitted.join(" ")
          setBody(splittedBody)
          const value = match[1].substring(1, match[1].length - 1)
          setImage(value)
          setShowImg(true)
          setValue("body", splittedBody)
        }
      } else {
        setBody(data.article.body)
        setValue("body", data.article.body)
      }
    }
  }, [data])

  return (
    <>
      {!data ? (
        <CircularProgress className="mx-auto" />
      ) : (
        <Box
          className="xs:w-[80vw] sm:w-[60vw] bg-white rounded-lg mx-auto p-[28px] animate-display relative"
          sx={{
            bgcolor: "primary.main",
            color: "secondary.main",
            boxShadow: `0px 0px 3px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
          }}
        >
          <h3 className="text-center font-Roboto">Edit article</h3>
          <form className="flex flex-col gap-5 relative" id="create-article-form" onSubmit={onSubmit}>
            <div className="flex flex-col gap-12">
              <fieldset>
                <div className="flex flex-col gap-5 text-[12px]">
                  <FormField
                    rows={1}
                    defaultValue={data?.article.title}
                    placeholder="Title"
                    id="title"
                    type="edit"
                    error={!!errors.title}
                    errors={errors.title}
                    register={register}
                    name="title"
                  />
                  <FormField
                    rows={1}
                    placeholder="Description"
                    defaultValue={data?.article.description}
                    id="description"
                    type="edit"
                    error={!!errors.description}
                    errors={errors.description}
                    register={register}
                    name="description"
                  />
                  <FormField
                    multiline={true}
                    rows={isMobile ? 5 : 7}
                    placeholder="Text"
                    defaultValue={body}
                    id="body"
                    type="edit"
                    error={!!errors.body}
                    errors={errors.body}
                    register={register}
                    name="body"
                  >
                    <div className="flex items-center gap-3 min-h-[56px]">
                      <Button
                        component="label"
                        role={undefined}
                        color="info"
                        variant="text"
                        tabIndex={-1}
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
                          {...register("image", {
                            onChange: (e) =>
                              handleImg(e).then((dataUrl) => {
                                setImage(dataUrl)
                                setValue("image", nanoid())
                                setShowImg(true)
                              }),
                          })}
                        />
                      </Button>
                      <CSSTransition
                        nodeRef={imgRef}
                        in={showImg}
                        onExited={() => setImage(undefined)}
                        timeout={300}
                        classNames="alert"
                        unmountOnExit
                      >
                        <Box
                          className="relative cursor-pointer"
                          ref={imgRef}
                          onClick={(e) => {
                            e.stopPropagation()
                            setPortalOpen(true)
                          }}
                        >
                          <img
                            src={image}
                            alt="img"
                            className="w-14 h-14 rounded-[3px] opacity-60 hover:opacity-40 transition-opacity duration-200"
                          />

                          <Button
                            className="w-4 h-4 top-1 right-1 hover:opacity-50 flex justify-center items-center"
                            variant="contained"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowImg(false)
                            }}
                            startIcon={<ClearIcon className="text-gray-600" />}
                            sx={{
                              position: "absolute",
                              bgcolor: "white",
                              transitionProperty: "opacity",
                              transitionDuration: 300,
                              padding: 0,
                              minWidth: 0,
                              "& .MuiButton-startIcon": {
                                margin: 0,
                              },
                            }}
                          />
                        </Box>
                      </CSSTransition>
                    </div>
                  </FormField>
                  <div className="w-[100%] relative">
                    <TransitionGroup className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
                      {fields?.map((e, index) => {
                        const ref = createRef() as Ref<any>
                        return (
                          <CSSTransition
                            nodeRef={ref}
                            classNames="alert"
                            timeout={300}
                            key={e.id}
                            in={!!e.id}
                            unmountOnExit
                          >
                            <li key={e.id} className="list-none relative" ref={ref}>
                              <label className="inline-block relative">
                                <Tag
                                  message={errors.tagList?.[index]?.message}
                                  remove={handleDelete}
                                  key={e.id}
                                  error={!!errors.tagList?.[index]}
                                  id={e.id}
                                  index={index}
                                  register={register(`tagList.${index}.tag`)}
                                />
                              </label>
                            </li>
                          </CSSTransition>
                        )
                      })}
                    </TransitionGroup>
                    <Box
                      className="left-0 w-full min-h-10 pointer-events-none absolute bottom-0"
                      sx={{ backgroundImage: `linear-gradient(to top, ${theme.palette.primary.main}, transparent)` }}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <ColorButton type="submit" className="w-[200px] xs:self-center sm:self-start">
              Send
            </ColorButton>
            <Button
              variant="outlined"
              color="info"
              startIcon={<LocalOfferIcon />}
              sx={{
                position: "absolute",
                bottom: "15%",
                maxWidth: "95px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                fontSize: isMobile ? "12px" : null,
              }}
              className={clsx(
                fields?.length ? "animate-transform" : firstRender ? "animate-none" : "animate-transform-back"
              )}
              onClick={() => {
                append({ tag: "" })
                setFirstRender(false)
              }}
            >
              Add tag
            </Button>
          </form>
        </Box>
      )}
      <Portal isOpen={portalOpen}>
        <div className="absolute w-[100vw] h-[100vh]">
          <img
            src={image}
            alt="avatar"
            className="absolute xs:w-[70vw] s:w-[50vw] max-w-[700px] max-h-[700px] animate-display left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded"
          ></img>
        </div>
      </Portal>
    </>
  )
}
export default EditArticle
