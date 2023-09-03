import * as React from 'react'
import {build, compute, draw, parse} from '../helpers/main'
import {Generation} from '../types'
import {resolution} from '../App'
import {countLiveCells} from '../helpers/utils'
import {Slider} from './Slider'
import {Details} from './Details'

interface Props<T> {
  text: string
  rows: number
  cols: number
  children: (data: T) => React.ReactNode
}

export const Grid = ({text, rows, cols, children}: Props<Generation>) => {
  const [generation, setGeneration] = React.useState<Generation>([[]])
  const [delay, setDelay] = React.useState(1000)

  React.useEffect(() => {
    setGeneration(draw(build(cols, rows), parse(text)))
  }, [cols, rows, text])

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setGeneration(compute(generation))
    }, delay)
    return () => clearInterval(timeout)
  })

  const onDelayUpdate: React.ChangeEventHandler<HTMLInputElement> = event =>
    setDelay(parseInt(event.target.value))

  return (
    <>
      <Details
        list={[
          {term: 'Generation:', description: countLiveCells(generation)},
          {term: 'Rows:', description: rows},
          {term: 'Cols:', description: cols},
        ]}
      />
      <Slider onChange={onDelayUpdate} value={delay} />
      <div
        className={`w-${resolution} grid gap-px`}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {children(generation)}
      </div>
    </>
  )
}
