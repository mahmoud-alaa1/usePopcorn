import { useEffect } from "react";

export default function useKey(key, action) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callBack);
      return () => document.removeEventListener("keydown", callBack);
    },
    [action, key]
  );
}
