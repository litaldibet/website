import "../../assets/css/MenuPage.css"

type MenuPageProps = {
  title?: string
}

export default function MenuPage({ title = "Menu" }: MenuPageProps) {
  return (
    <section className="menu-page">
      <h1 className="menu-page-title">
        {title}
      </h1>
      <p className="menu-page-text">
        Página sendo implementada.
      </p>
    </section>
  )
}
