import { ChangeEvent } from "react"
import * as imageConversion from "image-conversion"

export const handleImg = async (e: ChangeEvent<HTMLInputElement>) => {
  const { files } = e.target as HTMLInputElement
  if (files?.[0]) {
    const compressedImg = await imageConversion.compressAccurately(files[0], 50)
    return await imageConversion.filetoDataURL(compressedImg)
  }
}
