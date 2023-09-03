interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Upload = ({onChange}: Props) => {
  return (
    <input
      type='file'
      id='file'
      accept='.txt*'
      className='my - 1.5'
      onChange={onChange}
    />
  )
}
