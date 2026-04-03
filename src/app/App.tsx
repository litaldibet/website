
import { Navigate, Route, Routes } from "react-router-dom"
import SiteLayout from "../components/SiteLayout"
import ContatosPage from "../pages/ContatosPage"
import MenuPage from "../pages/MenuPage"
import PostDetailsPage from "../pages/PostDetailsPage"
import PostsListPage from "../pages/PostsListPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/menu" replace />} />

      <Route element={<SiteLayout />}>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/apostas" element={<MenuPage title="Apostas" />} />
        <Route path="/cassino" element={<MenuPage title="Cassino" />} />

        <Route
          path="/promocoes"
          element={<PostsListPage title="Promoções" category="PROMOCAO" routePrefix="/promocoes" />}
        />
        <Route
          path="/promocoes/:slug"
          element={<PostDetailsPage category="PROMOCAO" listPath="/promocoes" />}
        />

        <Route
          path="/blog"
          element={<PostsListPage title="Blog" category="BLOG" routePrefix="/blog" />}
        />
        <Route
          path="/blog/:slug"
          element={<PostDetailsPage category="BLOG" listPath="/blog" />}
        />

        <Route path="/contatos" element={<ContatosPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/menu" replace />} />
    </Routes>
  )
}

export default App
