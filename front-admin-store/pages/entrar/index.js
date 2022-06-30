import { EmptyLayout } from 'pages/_app'
import { Login } from '../../container/entrar'

export default function LoginView() {
  return (
    <div>
      <Login />
    </div>
  )
}

LoginView.Layout = EmptyLayout
