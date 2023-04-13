import { ReactNode } from 'react'
import { Link, To } from 'react-router-dom'
import './index.scss'

function NavigationLink({ children, to }: NavigationLinkProps) {
  return (
    <div className="navigation-link">
      <Link to={to}>{children}</Link>
    </div>
  )
}

export interface NavigationLinkProps {
  children: ReactNode,
  to: To,
}

export default NavigationLink
