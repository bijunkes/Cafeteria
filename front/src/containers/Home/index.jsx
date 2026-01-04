import React from "react";
import { Background, Hero, OverlayHero, ContentHero, Top, Title, Theme, Search, SearchInput, Footer, FooterButton } from "./styles";

function Home({ toggleTheme, themeAtual }) {
    return (
        <Background>
            <Hero>
                <OverlayHero>
                    <ContentHero>
                        <Top>
                            <Title>Cafe Shop</Title>
                            <Theme onClick={toggleTheme}>
                                <span className="material-icons-outlined">
                                    {themeAtual === "light" ? "light_mode" : "dark_mode"}
                                </span>
                            </Theme>
                        </Top>
                        <Search>
                            <span className="material-icons-outlined">
                                {"search"}
                            </span>
                            <SearchInput placeholder="Pesquisar" />
                        </Search>
                    </ContentHero>
                </OverlayHero>
            </Hero>
            <Footer>
                <FooterButton>
                    <span className="material-icons-outlined">
                        {"home"}
                    </span>
                    Home
                </FooterButton>
                <FooterButton>
                    <span className="material-icons-outlined">
                        {"shopping_bag"}
                    </span>
                    Sacola
                </FooterButton>
                <FooterButton>
                    <span className="material-icons-outlined">
                        {"person"}
                    </span>
                    Perfil
                </FooterButton>
            </Footer>
        </Background>
    )
}

export default Home;