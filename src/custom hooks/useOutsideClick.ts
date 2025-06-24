import { useEffect, useState, RefObject } from "react";

export default function useOutsideClick(
  sortRef: RefObject<HTMLDivElement | null>,
) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const current = sortRef.current;
      const path = event.composedPath();
      if (current && !path.includes(current)) {
        setVisible(false);
      }
    };

    document.body.addEventListener("click", clickOutside);

    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, [sortRef]);

  return [isVisible, setVisible] as const;
}
