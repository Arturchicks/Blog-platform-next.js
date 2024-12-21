"use client"
import { createRef, Ref } from "react"
import Blur from "../../UI/blur"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Tag from "../added-tag/added-tag"
import { AddedTagListType } from "./types"
import React from "react"

const AddedTagList: React.FC<AddedTagListType> = ({
  fields,
  remove,
  errors,
  register,
}) => {
  return (
    <React.Fragment>
      <TransitionGroup className="h-20 flex flex-col gap-2 overflow-auto animate-display scrollbar-gutter w-fit max-w-[60%]">
        {fields?.map((e, index: number) => {
          const ref = createRef() as Ref<HTMLLabelElement>
          return (
            <CSSTransition
              nodeRef={ref}
              classNames="display"
              timeout={300}
              key={e.id}
              in={!!e.id}
              unmountOnExit
            >
              <label className="inline-block relative" ref={ref}>
                <Tag
                  remove={remove}
                  key={e.id}
                  error={errors?.[index]?.tag}
                  index={index}
                  register={register(`tags.${index}.tag`)}
                />
              </label>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      <Blur />
    </React.Fragment>
  )
}
export default AddedTagList
