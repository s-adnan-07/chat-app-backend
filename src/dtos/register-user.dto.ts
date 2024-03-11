import LoginUser from './login-user.dto'

interface RegisterUser extends LoginUser {
  username: string
  fullname: string
}

export default RegisterUser
