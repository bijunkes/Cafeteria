import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { scroll } from "../../components/scroll";
import { Classes, Class, Options, Option, OptionText, Menu, MenuTitle, Items, Item, ItemImage, ItemText, ItemPrice } from "./styles";

import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import BackgroundComponent from "../../components/Background";

function Home({ toggleTheme, themeAtual }) {
    const categories = ["Favoritos", "Clássicos", "Com leite", "Especiais", "Gelados"];
    const [activeIndex, setActiveIndex] = useState(0);

    const showBars = scroll();

    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={true}
            />
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

            <FooterComponent
                visible={showBars}
                onProfileClick={() => {
                    if (!user) {
                        navigate("/login");
                    } else {
                        navigate("/profile");
                    }
                }}
            />
        </BackgroundComponent>
    )
}

export default Home;