import NavigationLink from "../NavigationLink"

import './index.scss'

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/personal-projects">Projects</NavigationLink>
      </nav>
    </div>
  )
}

export default Navigation
