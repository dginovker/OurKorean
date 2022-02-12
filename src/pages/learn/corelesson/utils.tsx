import { MutableRefObject } from "react";

let inputRef: MutableRefObject<HTMLInputElement>;
export function useLessonInputFocus(htmlElRef: MutableRefObject<HTMLInputElement> = inputRef): [MutableRefObject<HTMLInputElement>, any] {
  inputRef = htmlElRef;
  const setFocus = (): void => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};