interface Props {
  list: {term: string; description: number}[]
}

export const Details = ({list}: Props) => {
  return (
    <dl className='flex gap-6 my-2'>
      {list.map(({term, description}, index) => (
        <div key={index} className='flex'>
          <dt className='mr-1'>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  )
}
