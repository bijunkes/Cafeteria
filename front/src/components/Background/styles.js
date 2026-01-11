import styled from "styled-components";

export const Background = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
`;