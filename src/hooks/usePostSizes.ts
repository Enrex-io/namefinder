import { useEffect } from "react";

export const usePostSizes = (...deps: Array<unknown>) => {
  useEffect(() => {
    if (window.parent) {
      const sizeMessage = {
        height: document.body.offsetHeight,
        width: document.body.offsetWidth,
      };
      window.parent.postMessage(sizeMessage, "*");
    }
  }, [...deps]);
};
