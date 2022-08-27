import { useCallback, useMemo, useState } from "react"

export const useIterator = <T>(items: T[], initialValue = 0) => {
  const [i, setIndex] = useState(initialValue)
  const prev = useCallback(() => {
    if (i === 0) {
      setIndex(items.length - 1)
      return
    }
    setIndex(i - 1)
  }, [i, items.length])
  const next = useCallback(() => {
    if (i === items.length - 1) {
      setIndex(0)
      return
    }
    setIndex(i + 1)
  }, [i, items.length])

  const item = useMemo(() => items[i], [i, items])

  return [item ?? items[0], prev, next] as const
}
