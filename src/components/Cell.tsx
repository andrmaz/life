import {resolution} from '../App'

interface Props {
  cols: number
  rows: number
  state: number
}

export const Cell = ({cols, rows, state}: Props) => (
  <div
    style={{
      width: `${resolution / cols}px`,
      height: `${resolution / rows}px`,
      backgroundColor: state ? 'black' : 'white',
    }}
  />
)
