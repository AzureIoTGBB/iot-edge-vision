import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <Link to='/' className="simple-text">
              Dashboard
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/cameras'>
                <i className="nc-icon nc-camera-20"></i>
                <p>Cameras</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/alerts'>
                <i className="nc-icon nc-bell-55"></i>
                <p>Alerts</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/account'>
                <i className="nc-icon nc-circle-09"></i>
                <p>Account</p>
              </NavLink>
            </li>
            <li class="nav-item active active-pro">
              <a class="nav-link active" href="">
                    <p>Log Out</p>
              </a>
            </li>

          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar