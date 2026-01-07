import React, { useState } from "react";
import { scroll } from "../../components/scroll";
import { Background, Hero, OverlayHero, ContentHero, Top, Title, Theme, Search, SearchInput, Classes, Class, Options, Option, OptionText, Menu, MenuTitle, Items, Item, ItemImage, ItemText, ItemPrice, Footer, FooterButton } from "./styles";

function Home({ toggleTheme, themeAtual }) {
    const categories = ["Favoritos", "Clássicos", "Com leite", "Especiais", "Gelados"];
    const [activeIndex, setActiveIndex] = useState(0);

    const showBars = scroll();

    return (
        <Background>
            <Hero $visible={showBars} >
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

            <Classes>
                {categories.map((cat, index) => (
                    <Class
                        key={cat}
                        active={index === activeIndex}
                        onClick={() => setActiveIndex(index)}
                    >
                        {cat}
                    </Class>
                ))}
            </Classes>

            <Options>
                <Option>
                    <OptionText>
                        Expresso
                    </OptionText>
                </Option>
                <Option>
                    <OptionText>
                        Expresso
                    </OptionText>
                </Option>
                <Option>
                    <OptionText>
                        Expresso
                    </OptionText>
                </Option>
            </Options>

            <Menu>
                <MenuTitle>
                    Cardápio
                </MenuTitle>
                <Items>
                    <Item>
                        <ItemImage>
                            A
                        </ItemImage>
                        <ItemText>
                            <span className="name">Expresso</span>
                            <span className="class">Clássico</span>
                        </ItemText>
                        <ItemPrice>
                            <span className="currency">R$</span>
                            <span className="value">6</span>
                        </ItemPrice>
                    </Item>
                </Items>
            </Menu>

            <Footer $visible={showBars} >
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