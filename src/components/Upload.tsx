interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Upload = ({onChange}: Props) => {
  return (
    <input
      type='file'
      id='file'
      accept='.txt*'
      style={{margin: '0.4rem 0'}}
      onChange={onChange}
    />
  )
}
