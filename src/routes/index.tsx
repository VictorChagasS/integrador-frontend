import React from 'react'
import {Switch } from 'react-router-dom'

import Route from './Route'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Profile from '../pages/Profile'

const Routes:React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/signup" component={Register}/>
        <Route path="/home" component={Home} isPrivate/>
        <Route path="/profile" component={Profile} isPrivate/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/reset-password" component={ResetPassword}/>
    </Switch>
)

export default Routes