import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errMsg: '', se: false}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  failure = errMsg => {
    this.setState({errMsg, se: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, se, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="sub-container">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div>
            <form className="form-container" onSubmit={this.onSubmitLogin}>
              <h1 className="heading">Welcome Back!</h1>
              <div className="input-container">
                <label htmlFor="userId" className="label">
                  User ID
                </label>
                <input
                  id="userId"
                  value={userId}
                  type="text"
                  onChange={this.onChangeUserId}
                  className="input"
                  placeholder="Enter User ID"
                />
              </div>
              <div className="input-container">
                <label htmlFor="pin" className="label">
                  PIN
                </label>
                <input
                  id="pin"
                  value={pin}
                  type="password"
                  onChange={this.onChangePin}
                  className="input"
                  placeholder="Enter PIN"
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              <div className="err">
                {se === true && <p className="errMsg">{errMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
