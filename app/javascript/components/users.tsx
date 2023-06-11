import { useState } from 'react'
import { GetUsersResponse } from '../generated_types/users'
import PaginationLinks from './pagination'
import getApi from '../utils/get_api'

const Users = ({ pagination: initialPagination, users: initialUsers }: GetUsersResponse) => {
  const [pagination, setPagination] = useState(initialPagination)
  const [users, setUsers] = useState(initialUsers)

  // this methods loads the requested page & re-renders
  // the table/pagination using it
  const loadPage = async (pageNumber: number) => {
    const response = await getApi(`/users?page=${pageNumber}`)
    setUsers(response.users)
    setPagination(response.pagination)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>Show</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationLinks onPageChanged={newPage => loadPage(newPage)} {...pagination} />
    </>
  )
}

export default Users
