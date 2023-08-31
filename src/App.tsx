import * as React from 'react'
import {build, compute, draw, parse} from './helpers/main'
import {ResultingGeneration} from './types'
import {Grid} from './components/Grid'
import {Cell} from './components/Cell'

const resolution = 600
const delay = 1000
const cols = 8
const rows = 8

function App() {
  const [generation, setGeneration] = React.useState<ResultingGeneration>(() =>
    draw(build(cols, rows), parse(rows))
  )

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setGeneration(compute(generation))
    }, delay)
    return () => clearInterval(timeout)
  })

  return (
    <Grid resolution={resolution} cols={cols} rows={rows}>
      {generation.map(index => {
        return (
          <React.Fragment key={Math.random()}>
            {index.map(state => {
              return (
                <Cell
                  key={Math.random()}
                  state={state}
                  resolution={resolution}
                  cols={cols}
                  rows={rows}
                />
              )
            })}
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

export default App
