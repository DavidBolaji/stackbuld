"use client";

import { useEffect, useRef, MutableRefObject } from 'react';

export const usePortal = (id: string): HTMLDivElement | null => {
  const rootElemRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    if (typeof document === 'undefined') return;

    const existingParent = document.querySelector<HTMLElement>(`#${id}`);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }

    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }

    if (!parentElem.contains(rootElemRef.current)) {
      parentElem.appendChild(rootElemRef.current);
    }

    return () => {
      // Check if the element exists and is a child before removing
      if (rootElemRef.current && parentElem.contains(rootElemRef.current)) {
        rootElemRef.current.remove();
      }
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  function createRootElement(id: string): HTMLElement {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
  }

  function addRootElement(rootElem: HTMLElement): void {
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild!.nextElementSibling
    );
  }

  return rootElemRef.current;
};
