import * as React from 'react'
import {build, compute, draw, parse} from '../helpers/main'
import {ResultingGeneration} from '../types'

interface Props<T> {
  cols: number
  rows: number
  resolution: number
  text: string
  children: (data: T) => React.ReactNode
}

const delay = 1000

export const Grid = ({
  cols,
  rows,
  resolution,
  text,
  children,
}: Props<ResultingGeneration>) => {
  const [generation, setGeneration] = React.useState<ResultingGeneration>([[]])

  React.useEffect(() => {
    setGeneration(draw(build(cols, rows), parse(text)))
  }, [cols, rows, text])

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setGeneration(compute(generation))
    }, delay)
    return () => clearInterval(timeout)
  })

  return (
    <div
      style={{
        width: `${resolution}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '1px',
      }}
    >
      {children(generation)}
    </div>
  )
}
