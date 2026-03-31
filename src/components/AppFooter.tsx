import "../../assets/css/AppFooter.css"

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer-container">
        Litaldi Bet © {new Date().getFullYear()}
      </div>
    </footer>
  )
}
