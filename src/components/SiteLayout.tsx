import { Outlet } from "react-router-dom"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import "../../assets/css/SiteLayout.css"

export default function SiteLayout() {
  return (
    <div className="site-layout">
      <AppHeader />

      <main className="site-layout-main">
        <div className="site-layout-main-container">
          <Outlet />
        </div>
      </main>

      <AppFooter />

      <div aria-hidden className="site-layout-orb site-layout-orb-accent" />

      <div aria-hidden className="site-layout-orb site-layout-orb-soft" />
    </div>
  )
}
