interface Props {
  list: {term: string; description: number}[]
}

export const Details = ({list}: Props) => {
  return (
    <dl>
      {list.map(({term, description}, index) => (
        <div key={index}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  )
}
