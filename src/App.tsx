import * as React from 'react'
import {build, compute, fill, parse} from './main'
import {ResultingGeneration} from './types'

const resolution = 600
const delay = 1000
const cols = 8
const rows = 8

function App() {
  const [generation, setGeneration] = React.useState<ResultingGeneration>(() =>
    fill(build(cols, rows), parse(rows))
  )

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setGeneration(compute(generation))
    }, delay)
    return () => clearInterval(timeout)
  })

  return (
    <Grid>
      {generation.map(index => {
        return (
          <React.Fragment key={Math.random()}>
            {index.map(state => {
              return <Cell key={Math.random()} state={state} />
            })}
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

const Grid = (props: React.PropsWithChildren<object>) => (
  <div
    style={{
      width: `${resolution}px`,
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: '1px',
    }}
  >
    {props.children}
  </div>
)

const Cell = ({state}: {state: number}) => (
  <div
    style={{
      width: `${resolution / cols}px`,
      height: `${resolution / rows}px`,
      backgroundColor: state ? 'black' : 'white',
    }}
  />
)

export default App
