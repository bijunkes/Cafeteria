import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
}

body {
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.5s ease, color 0.5s ease;
}

button, input, h1, h2, h3, h4, h5, h6, div {
    transition: color 0.7s ease, background-color 0.7s ease;
}

img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
}

input, button, textarea, select {
    font: inherit;
}

button {
    cursor: pointer;
    background: none;
    border: none;
}

a {
    text-decoration: none;
    color: inherit;
}

ul, ol {
    list-style: none;
}
`;

export default GlobalStyle;
