import { type MutableRefObject, useEffect, useState } from "react";

type Options = {
  rootMargin: `${number}px`;
  threshold: number;
};

export const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  options: Options = {
    rootMargin: "0px",
    threshold: 1.0,
  },
) => {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    if (!ref.current) return;
    let observerRefValue: Element | null = null;
    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(ref.current);
    observerRefValue = ref.current;

    return () => {
      observer.unobserve(observerRefValue!);
    };
  }, [ref, options]);

  return { isVisible };
};
