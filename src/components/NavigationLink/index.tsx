import './index.scss'

function NavigationLink({ title }: NavigationLinkProps) {
  return (
    <div className="navigation-link">
      <a href={`/${title.toLowerCase()}`}>{title}</a>
    </div>
  )
}

export interface NavigationLinkProps {
  title: string,
}

export default NavigationLink
