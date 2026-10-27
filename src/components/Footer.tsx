import { siteConfig } from '../config/site'
import './Footer.css'

export function Footer() {
  const { linkText, linkHref, credits } = siteConfig.footer
  return (
    <footer className="footer">
      <a className="footer__link" href={linkHref}>
        {linkText}
      </a>
      <p className="footer__credits">{credits}</p>
    </footer>
  )
}
