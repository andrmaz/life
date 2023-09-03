interface Props {
  value: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Slider = ({value, onChange}: Props) => {
  return (
    <div className='flex flex-col mb-2 w-2/5'>
      <label htmlFor='delay'>Delay: {value}ms</label>
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
    </div>
  )
}
