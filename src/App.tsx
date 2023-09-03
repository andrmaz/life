import * as React from 'react'

import {Grid} from './components/Grid'
import {Cell} from './components/Cell'
import {Upload} from './components/Upload'
import {readRows, readCols} from './helpers/main'

export const resolution = 600

function App() {
  const [text, setText] = React.useState('')
  const [rows, setRows] = React.useState(0)
  const [cols, setCols] = React.useState(0)

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0]
    if (file) {
      file
        .text()
        .then(text => {
          setText(text)
          setRows(readRows(text))
          setCols(readCols(text))
        })
        .catch(console.error)
    } else {
      console.warn('Could not find file')
    }
  }

  return (
    <main className='w-fit m-auto p-16'>
      <Upload onChange={onFileUpload} />
      <Grid text={text} rows={rows} cols={cols}>
        {generation =>
          generation.map((axis, index) => {
            return (
              <React.Fragment key={index + Math.random()}>
                {axis.map((state, index) => {
                  return (
                    <Cell
                      key={index + Math.random()}
                      state={state}
                      rows={generation.length}
                      cols={generation[0].length}
                    />
                  )
                })}
              </React.Fragment>
            )
          })
        }
      </Grid>
    </main>
  )
}

export default App
