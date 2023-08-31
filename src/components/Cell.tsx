interface Props {
  resolution: number
  cols: number
  rows: number
  state: number
}

export const Cell = ({resolution, cols, rows, state}: Props) => (
  <div
    style={{
      width: `${resolution / cols}px`,
      height: `${resolution / rows}px`,
      backgroundColor: state ? 'black' : 'white',
    }}
  />
)
