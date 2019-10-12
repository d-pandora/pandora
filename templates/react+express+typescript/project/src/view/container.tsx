import React, { SFC } from 'react'
import { Link } from 'react-router-dom'

const Container: SFC<{}> = (props): JSX.Element => {
  return (
    <div>
      <h1>App</h1>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      {props.children}
    </div>
  )
}

export default Container