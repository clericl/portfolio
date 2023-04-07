import NavigationLink from "../NavigationLink"

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
