import NavigationLink from "../NavigationLink"

import './index.scss'

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/work">Work</NavigationLink>
      </nav>
    </div>
  )
}

export default Navigation
