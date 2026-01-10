import styled from "styled-components";

export const Background = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
`;