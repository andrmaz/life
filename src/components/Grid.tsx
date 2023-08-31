interface Props {
  resolution: number
  cols: number
  rows: number
}

export const Grid = (props: React.PropsWithChildren<Props>) => (
  <div
    style={{
      width: `${props.resolution}px`,
      display: 'grid',
      gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
      gridTemplateRows: `repeat(${props.rows}, 1fr)`,
      gap: '1px',
    }}
  >
    {props.children}
  </div>
)
