import styled from "styled-components";

export const Title = styled.button`
    font-size: 22px;
    margin-bottom: 1vh;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

export const Aside = styled.div`
    width: 100%;
    gap: 2vh;
    display: flex;
    flex-direction: row;
`;

export const Button = styled.button`
    height: 7vh;
    width: 80%;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};;
`;

export const SubmitButton = styled.button`
    height: 7vh;
    width: 50%;
    border-radius: 20px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};

    opacity: ${({ $visible }) => ($visible ? 1 : 0)};

    transition: opacity 1s ease, transform 1s ease;

    pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
    margin-bottom: 10vh;
`;

export const Select = styled.select`
    width: 100%;
    background: transparent;
    border: none;
    outline: none;

    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;


    cursor: pointer;

    option {
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text};
    }
`;

export const Table = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: auto auto;
    width: 100%;

    padding: 1.5vh;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const TableCell = styled.div`
    text-align: center;

    border-right: 1px solid ${({ theme }) => theme.colors.primary};

    &:nth-child(3n) {
        border-right: none;
    }

    font-weight: ${({ header }) => (header ? 600 : 400)};
`;
