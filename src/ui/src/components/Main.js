import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cameras from './Cameras'
import Alerts from './Alerts'
import Account from './Account'

class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        {/* <Navbar /> */}
        <Switch>
          <Route path="/cameras" component={Cameras} />
          <Route path="/alerts" component={Alerts} />
          <Route path="/account" component={Account} />
          <Redirect from='*' to='/cameras' />
        </Switch>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default Main