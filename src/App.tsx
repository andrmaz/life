import * as React from 'react'

import {Grid} from './components/Grid'
import {Cell} from './components/Cell'

const resolution = 600

function App() {
  const [text, setText] = React.useState('')
  const [rows, setRows] = React.useState(0)
  const [cols, setCols] = React.useState(0)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0]
    if (file) {
      file.text().then(setText).catch(console.error)
    } else {
      console.warn('Could not find file')
    }
  }

  React.useEffect(() => {
    if (text.length) {
      setRows(parseInt(text.at(15) || '0'))
      setCols(parseInt(text.at(17) || '0'))
    }
  }, [text])

  return (
    <>
      <input
        type='file'
        id='file'
        accept='.txt*'
        style={{margin: '0.4rem 0'}}
        onChange={onChange}
      />
      <Grid cols={cols} rows={rows} resolution={resolution} text={text}>
        {generation =>
          generation.map(index => {
            return (
              <React.Fragment key={Math.random()}>
                {index.map(state => {
                  return (
                    <Cell
                      key={Math.random()}
                      state={state}
                      cols={cols}
                      rows={rows}
                      resolution={resolution}
                    />
                  )
                })}
              </React.Fragment>
            )
          })
        }
      </Grid>
    </>
  )
}

export default App
