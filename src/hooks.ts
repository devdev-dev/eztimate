import { useEffect, useRef } from 'react';

export function usePrevious(value: unknown) {
  const ref = useRef<unknown>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}