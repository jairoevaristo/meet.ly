import { useState, createContext, useMemo, useCallback } from "react";

type TagTypeContext = {
  tag: string;
  onSelectTypeTag: (tag: string) => void;
};

export const tagContext = createContext({} as TagTypeContext);

export function TagProvider({ children }: { children: ReactNode }) {
  const [typeTag, setTypeTag] = useState("");

  const onSelectTypeTag = useCallback((tag: string) => {
    setTypeTag(tag);
  }, []);

  const values = useMemo(
    () => ({
      tag: typeTag,
      onSelectTypeTag,
    }),
    [typeTag, onSelectTypeTag]
  );

  return <tagContext.Provider value={values}>{children}</tagContext.Provider>;
}
