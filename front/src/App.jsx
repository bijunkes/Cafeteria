import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/reset';
import { light, dark } from './styles/themes'
import Home from './containers/Home';

function App() {
    const [theme, setTheme] = useState("light");

    const themeAtual = theme === "light" ? light : dark;

    return (
        <ThemeProvider theme={themeAtual}>
            <GlobalStyle />
            <Home
                toggleTheme={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
                themeAtual={theme}
            />
        </ThemeProvider>
    );
}

export default App;