import { siteConfig } from '../config/site'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="/" aria-label="Pick Me Ups home">
        <span aria-hidden="true">{siteConfig.logoLetter}</span>
      </a>
    </header>
  )
}
