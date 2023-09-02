import * as React from 'react'
import {build, compute, draw, parse} from '../helpers/main'
import {Generation} from '../types'
import {resolution} from '../App'
import {countLiveCells} from '../helpers/utils'
import {Slider} from './Slider'
import {Details} from './Details'

interface Props<T> {
  cols: number
  rows: number
  text: string
  children: (data: T) => React.ReactNode
}

export const Grid = ({cols, rows, text, children}: Props<Generation>) => {
  const [delay, setDelay] = React.useState(1000)
  const [generation, setGeneration] = React.useState<Generation>([[]])

  const onDelayUpdate: React.ChangeEventHandler<HTMLInputElement> = event =>
    setDelay(parseInt(event.target.value))

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
    <>
      <Details
        list={[{term: 'Generation:', description: countLiveCells(generation)}]}
      />
      <Slider onChange={onDelayUpdate} value={delay} />
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
    </>
  )
}
