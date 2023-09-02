import * as React from 'react'

import {Grid} from './components/Grid'
import {Cell} from './components/Cell'
import {readCols, readRows} from './helpers/main'
import {Upload} from './components/Upload'
import {Details} from './components/Details'

export const resolution = 600

function App() {
  const [text, setText] = React.useState('')
  const [rows, setRows] = React.useState(0)
  const [cols, setCols] = React.useState(0)

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files?.[0]
    if (file) {
      file.text().then(setText).catch(console.error)
    } else {
      console.warn('Could not find file')
    }
  }

  React.useEffect(() => {
    if (text.length) {
      setRows(readRows(text))
      setCols(readCols(text))
    }
  }, [text])

  return (
    <>
      <Details
        list={[
          {term: 'Rows:', description: rows},
          {term: 'Cols:', description: cols},
        ]}
      />
      <Upload onChange={onFileUpload} />
      <Grid cols={cols} rows={rows} text={text}>
        {generation =>
          generation.map((axis, index) => {
            return (
              <React.Fragment key={index + Math.random()}>
                {axis.map((state, index) => {
                  return (
                    <Cell
                      key={index + Math.random()}
                      state={state}
                      cols={cols}
                      rows={rows}
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
