function NavigationLink({ title }: NavigationLinkProps) {
  return (
    <div className="navigation-link">
      <a href={`#${title}`}>{title}</a>
    </div>
  )
}

export interface NavigationLinkProps {
  title: string,
}

export default NavigationLink
