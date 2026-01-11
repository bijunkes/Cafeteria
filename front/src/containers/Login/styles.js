import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 15vh - 12vh);
    padding: 4vh;
    cursor: default;
    gap: 2vh;
`;

export const Title = styled.h2`
    align-self: flex-start;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.div `
    height: 6vh;
    width: 100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0vh 2vh;
    gap: 1vh;
    font-size: 15px;
    
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const InputContent = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
`;

export const ForgotPassword = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    align-self: flex-end;

    &:hover{
        font-weight: 600;
    }
`;

export const Button = styled.div`
    height: 6vh;
    width: 100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-weight: 600;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    margin-top: 5vh;
`;

export const Sign = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    margin-top: 5vh;
    span{
        font-weight: 700;
        cursor: pointer;
    }
`;