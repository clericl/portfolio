import NavigationLink from "../NavigationLink"

import './index.scss'

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <NavigationLink title="Home" />
        <NavigationLink title="About" />
        <NavigationLink title="Projects" />
      </nav>
    </div>
  )
}

export default Navigation
