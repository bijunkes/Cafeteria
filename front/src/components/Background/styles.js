import styled from "styled-components";

export const Background = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
`;

export const Container = styled.div`
    width: 100%;
    max-width: 110vh;
    margin: 0 auto;
`;
