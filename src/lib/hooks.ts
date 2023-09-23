import { type MutableRefObject, useEffect, useState } from "react";

type Options = {
  rootMargin: `${number}px`;
  threshold: number;
  root: HTMLElement | null
};

export const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  options: Options = {
    rootMargin: "10px",
    threshold: 1.0,
    root: null 
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
