import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 15vh - 12vh);
`;

export const Title = styled.h2`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.div `
    height: 6vh;
    width: calc(100% - 8vh);
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
`;

export const LoginButton = styled.div`
    height: 6vh;
    width: calc(100% - 8vh);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-weight: 600;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const SignUp = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
    span{
        font-weight: 700;
        cursor: pointer;
    }
`;