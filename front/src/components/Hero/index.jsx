import React, {useState} from "react";
import { useTheme } from "styled-components";
import { Hero, OverlayHero, ContentHero, Top, Title, Theme, Search, SearchInput } from "./styles";

function HeroComponent({ visible, toggleTheme, showSearch = true, products = [], onSelectProduct }) {
    const theme = useTheme();
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);

    function handleChange(e) {
        const value = e.target.value;
        setQuery(value);

        if (!value) {
            setFiltered([]);
            return;
        }

        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(filteredProducts);
    }

    function handleSelect(product) {
        setQuery("");
        setFiltered([]);
        if (onSelectProduct) {
            onSelectProduct(product);
        }
    }

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
                            <SearchInput placeholder="Pesquisar"
                                value={query}
                                onChange={handleChange} />
                        </Search>
                    )}
                </ContentHero>
            </OverlayHero>
        </Hero>
    );
}

export default HeroComponent;