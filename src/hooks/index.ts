import { type MutableRefObject, useEffect, useState, useRef } from "react";
import { throwError } from "@/lib/utils";

type Options = {
  rootMargin: string;
  threshold: number;
  root: HTMLElement | null;
};

export const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  options: Options = {
    rootMargin: "10px",
    threshold: 0,
    root: null,
  },
) => {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (!entry) return throwError("error in accessing entries array");
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

export const usePreventOverlapping = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const { height, y } = ref.current.getBoundingClientRect();
    if (height + y > window.innerHeight) {
      const difference = y + height - window.innerHeight;
      ref.current.style.transform = `translateY(-${
        difference + 1
      }px) translateX(-100%)`;
    }
  });

  return { ref };
};

export const useClickAway = <T extends HTMLElement>(
  callback: (...args: unknown[]) => unknown,
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
};
