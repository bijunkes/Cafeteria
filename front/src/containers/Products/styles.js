import styled from "styled-components";

export const Title = styled.button`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 2vh;
    color: ${({ theme }) => theme.colors.text};;
`;

export const Button = styled.button`
    height: 7vh;
    width: 80%;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};;
`;