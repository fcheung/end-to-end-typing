import { useCallback, MouseEventHandler } from 'react'
import { Pagination } from '../generated_types/users'

type Props = Pagination & {
  onPageChanged: (newPage: number) => void
}

const PaginationLinks = ({ current_page, total_entries, per_page, onPageChanged }: Props) => {
  const pageClicked: MouseEventHandler<HTMLAnchorElement> = useCallback(
    e => {
      const page = parseInt(e.currentTarget.dataset.page || '')
      e.preventDefault()
      e.stopPropagation()
      onPageChanged(page)
    },
    [onPageChanged]
  )

  const totalPages = Math.ceil(total_entries / per_page)

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <ol className="pagination">
      {pageNumbers.map(i => (
        <PageLink key={i} number={i} currentPage={current_page} onClick={pageClicked} />
      ))}
    </ol>
  )
}

type PageLinkProps = {
  number: number
  currentPage: number
  onClick: MouseEventHandler<HTMLAnchorElement>
}
const PageLink = ({ number, currentPage, onClick }: PageLinkProps) => {
  if (number === currentPage) {
    return <li key={number}>{number}</li>
  } else {
    return (
      <li key={number}>
        <a href="#" onClick={onClick} data-page={number}>
          {number}
        </a>
      </li>
    )
  }
}

export default PaginationLinks
