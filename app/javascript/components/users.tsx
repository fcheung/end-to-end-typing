import { GetUsersResponse } from '../generated_types/users'
import PaginationLinks from './pagination'

const Users = ({ pagination, users }: GetUsersResponse) => {
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
      <PaginationLinks onPageChanged={newPage => {}} {...pagination} />
    </>
  )
}

export default Users