"use client";

import { useEffect } from "react";

type PrintBodyClassProps = {
  className: string;
};

export function PrintBodyClass({ className }: PrintBodyClassProps) {
  useEffect(() => {
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return null;
}
