import React from "react";
import { Hero, OverlayHero, ContentHero, Top, Title, Theme, Search, SearchInput } from "./styles";

function HeroComponent({ visible, toggleTheme, themeAtual, showSearch = true }) {
    return (
        <Hero $visible={visible} >
            <OverlayHero>
                <ContentHero>
                    <Top>
                        <Title>Cafe Shop</Title>
                        <Theme onClick={toggleTheme}>
                            <span className="material-icons-outlined">
                                {themeAtual?.name === "light" ? "dark_mode" : "light_mode"}
                            </span>

                        </Theme>
                    </Top>
                    {showSearch && (
                        <Search>
                            <span className="material-icons-outlined">
                                {"search"}
                            </span>
                            <SearchInput placeholder="Pesquisar" />
                        </Search>
                    )}
                </ContentHero>
            </OverlayHero>
        </Hero>
    );
}

export default HeroComponent;