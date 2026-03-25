import styled from "styled-components";

export const ScrollContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 4vh;
    cursor: default;
    gap: 3vh;
`;

export const Title = styled.button`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

export const Aside = styled.div`
    width: 100%;
    gap: 2vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    transition: all 0.2s ease;

    &:focus {
        border-color: ${({ theme }) => theme.colors.bold};
    }

    option {
        background-color: ${({ theme }) => theme.colors.secondary};
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

export const OrderStatus = styled.div`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    width: 100%;
    height: 5vh;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    background: ${({ active, theme }) =>
        active ? theme.colors.primary : theme.colors.secondary};
    transition: 0.2s;
`;

export const Order = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 0.5fr;
    align-items: center;
    gap: 2vh;

    padding: 2vh 3vh;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};

    &:last-child {
        margin-bottom: 10vh;
    }

    span{
        font-weight: bold;
        font-size: 14px;
    }
`;

export const OrderId = styled.div`
    font-weight: bold;
    font-size: 14px;
`;

export const OrderInfo = styled.div`
`;

export const ReadyButton = styled.button`
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;

    span {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.text};
    }

    &:hover {
        transform: scale(1.1);
        opacity: 0.9;
    }

    span::before {
        content: ${({ isReady }) =>
            isReady ? '"undo"' : '"check_box_outline_blank"'};
    }

    &:hover span::before {
        content: ${({ isReady }) =>
            isReady ? '"undo"' : '"check_box"'};
    }
`;

export const Product = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    padding: 1.5vh 3vh;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    align-items: center;
    justify-content: space-between;

    .actions {
        display: flex;
        gap: 1vh;

        opacity: 0;
        transform: translateX(10px);
        transition: all 0.2s ease;

        button {
            pointer-events: none;
            color: ${({ theme }) => theme.colors.text};
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            justify-content: center;
        }
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
    }

    &:hover .actions {
        opacity: 1;
        transform: translateX(0);
    }

    &:hover .actions button{
        pointer-events: auto;
    }

    &:last-child {
        margin-bottom: 10vh;
    }
`;

export const Edit = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2vh;

    button {
        background-color: ${({ theme }) => theme.colors.primary};
        font-weight: bold;
        height: 7vh;
        border-radius: 20px;
        color: ${({ theme }) => theme.colors.text};
    }
`;
