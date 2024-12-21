import { ChangeEvent } from "react";
import * as imageConversion from "image-conversion";

export const handleImg = async (
  e: ChangeEvent<HTMLInputElement>
): Promise<string> => {
  const { files } = e.target as HTMLInputElement;
  if (files?.[0]) {
    const compressedImg = await imageConversion.compressAccurately(
      files[0],
      50
    );
    const encodedSrc = await imageConversion.filetoDataURL(compressedImg);
    return encodedSrc;
  } else return "";
};
