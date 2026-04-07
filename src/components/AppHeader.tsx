import { NavLink } from "react-router-dom"
import logo from "../../assets/img/litaldi_bet_2.png"
import "../../assets/css/AppHeader.css"

const navItems = [
  { label: "Menu", path: "/menu" },
  { label: "Apostas esportivas", path: "/apostas" },
  { label: "Cassino", path: "/cassino" },
  { label: "Promoções", path: "/promocoes" },
  { label: "Blog", path: "/blog" },
  { label: "Contatos", path: "/contatos" }
]

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-container">
        <NavLink to="/menu" className="app-header-logo-link">
          <img
            src={logo}
            alt="Litaldi Bet"
            className="app-header-logo"
          />
        </NavLink>

        <nav className="app-header-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "app-header-nav-link active" : "app-header-nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
