import styled from "styled-components";

export const Field = styled.div`
    position: relative;
    width: 100%;
`;

export const Label = styled.span`
    position: absolute;
    top: -1vh;
    left: 2vh;

    background: ${({ theme }) => theme.colors.background};
    padding: 0 1vh;

    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary};
    z-index: 2;
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
    margin-bottom: 1vh;
    
    border: 2px solid  ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
`;

export const InputContent = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
`;

export const Save = styled.button`
    height: 6vh;
    width: 50%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    align-self: flex-end;

    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.secondary};

    opacity: ${({ $visible }) => ($visible ? 1 : 0)};

    transition: opacity 1s ease, transform 1s ease;

    pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

export const Side = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: auto;
`;

export const Logout = styled.button `
    height: 6vh;
    width: 6vh;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0vh 2vh;
    gap: 1vh;
    font-size: 15px;
    justify-content: center;
    
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Admin = styled.div`
    height: 6vh;
    width: 6vh;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0vh 2vh;
    gap: 1vh;
    font-size: 15px;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.secondary};
`;