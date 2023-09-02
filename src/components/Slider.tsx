interface Props {
  value: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Slider = ({value, onChange}: Props) => {
  return (
    <div>
      <input
        type='range'
        id='delay'
        name='delay'
        min={0}
        max={3000}
        step={500}
        value={value}
        onChange={onChange}
      />
      <label htmlFor='delay'>Delay: {value}ms</label>
    </div>
  )
}
