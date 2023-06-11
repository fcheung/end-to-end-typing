import { UserDetail } from '../generated_types/users'

type Props = {
  user: UserDetail
}

const User = ({ user }: Props) => {
  return (
    <>
      <h2>{user.name}</h2>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Date of birth</th>
            <td>{user.date_of_birth}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default User
