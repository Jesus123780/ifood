import { Login } from '../../container/entrar'

export default function LoginView() {
  return (
    <div>
      <Login />
    </div>
  )
}

LoginView.getLayout = (page) => {
  return (
    <>
      {page}
    </>
  )
}