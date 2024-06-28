import {Link, withRouter} from 'react-router-dom'
import './index.css'

import Cookies from 'js-cookie'

const Header = props => {
  const remove = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="header">
      <Link to="/" className="link">
        <img
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="logo"
        />
      </Link>
      <button type="button" className="btn" onClick={remove}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
