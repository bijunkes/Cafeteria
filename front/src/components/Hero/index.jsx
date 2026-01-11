import React from "react";
import { useTheme } from "styled-components";
import { Hero, OverlayHero, ContentHero, Top, Title, Theme, Search, SearchInput } from "./styles";

function HeroComponent({ visible, toggleTheme, showSearch = true }) {
    const theme = useTheme();

    return (
        <Hero $visible={visible} >
            <OverlayHero>
                <ContentHero>
                    <Top>
                        <Title>Cafe Shop</Title>
                        <Theme onClick={toggleTheme}>
                            <span className="material-icons-outlined">
                                {theme.name === "light" ? "light_mode" : "dark_mode"}
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