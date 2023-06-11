import { useState } from 'react'
import { GetUsersResponse, UserDetail } from '../generated_types/users'
import PaginationLinks from './pagination'
import getApi from '../utils/get_api'
import User from './user'

const Users = ({ pagination: initialPagination, users: initialUsers }: GetUsersResponse) => {
  const [pagination, setPagination] = useState(initialPagination)
  const [users, setUsers] = useState(initialUsers)

  const [loadedUser, setLoadedUser] = useState<UserDetail | undefined>()

  // this methods loads the requested page & re-renders
  // the table/pagination using it
  const loadPage = async (pageNumber: number) => {
    const response = await getApi(`/users?page=${pageNumber}`)
    setUsers(response.users)
    setPagination(response.pagination)
  }

  const loadUser = async (userId: number) => {
    const response = await getApi(`/users/${userId}`)
    setLoadedUser(response.user)
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
              <td>
                <a onClick={() => loadUser(u.id)}>Show</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationLinks onPageChanged={newPage => loadPage(newPage)} {...pagination} />

      {loadedUser && <User user={loadedUser} />}
    </>
  )
}

export default Users
