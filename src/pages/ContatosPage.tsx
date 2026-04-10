import "../../assets/css/ContatosPage.css"
import { theme } from "../app/theme"

export default function ContatosPage() {
  return (
    <section className="contatos-page">
      <h1 className="contatos-page-title">
        Sobre o Projeto
      </h1>
      <p className="contatos-page-text">
        A <span style={{ color: theme.color.accent }}>LitaldiBet</span> nasceu como um espaço onde eu posso testar, estruturar e mostrar como penso produto dentro do iGaming.<br></br>
        É meu laboratório pessoal - onde controlo cada detalhe, de promoções e mercados até a forma como a experiência é construída.<br></br>
        O produto vai muito além da odd e da rodada. Está nos botões, no fluxo, na comunicação e em como tudo se conecta para criar uma jornada clara e funcional.<br></br>
        Aqui, eu exploro ideias, testo hipóteses e tento entender como pequenas decisões podem abrir novas oportunidades todos os dias.<br></br>
        O projeto ainda está em evolução. Se quiser trocar ideia ou acompanhar o desenvolvimento, <a href="https://www.linkedin.com/in/gabriel-litaldi/" style={{ color: theme.color.accent }}>esse sou eu</a>
      </p>
    </section>
  )
}
