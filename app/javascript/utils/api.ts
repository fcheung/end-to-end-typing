// this is the api definition file. it maps paths to types
// in this cutdown version it only handles one type per path (ie it doesn't handle http methods)

import { GetUserResponse, GetUsersResponse } from '../generated_types/users'

type UsersPath = `/users?page=${number}`

type UserShowPath = `/users/${number}`

type Api = {
  [path: UsersPath]: GetUsersResponse
  [path: UserShowPath]: GetUserResponse
}

export default Api
