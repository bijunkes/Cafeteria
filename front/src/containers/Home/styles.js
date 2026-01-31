import styled from 'styled-components';

export const Classes = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 5vh 0vh 3vh 0vh;
    gap: 4vh;
    justify-content: space-between;

    &::-webkit-scrollbar {
        height: 0;
    }

    &::before,
    &::after {
        content: "";
        flex: 0 0 0vh;
    }
`;

export const Class = styled.button`
    flex: 0 0 auto;
    color: ${({ active, theme }) => (active ? theme.colors.bold : theme.colors.text)};
    border: none;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    position: relative;

    &:after {
        content: "";
        position: absolute;
        bottom: -0.5vh;
        left: 50%;
        transform: translateX(-50%);
        width: ${({ active }) => (active ? "80%" : "0%")}; 
        height: 3px;
        background-color: ${({ theme, active }) => (active ? theme.colors.primary : "transparent")};
        border-radius: 2px;
        transition: width 0.7s ease;
    }
`;

export const Products = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 3vh;

    &::-webkit-scrollbar {
        height: 0;
    }

    &::before,
    &::after {
        content: "";
        flex: 0 0 1vh;
    }
`;

export const Product = styled.div`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    height: 21vh;
    width: 17vh;
    border-radius: 20px;
    padding: 1.5vh;
    background-color: ${({ theme }) => theme.colors.secondary};
    align-items: center;
    justify-content: center;
    font-weight: 600;

    img {
        width: 90%;
        height: auto;
        transition: transform 0.5s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
`;

export const ProductText = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    padding: 4vh 4vh 0vh 4vh;
    gap: 1vh;
    padding-bottom: 14vh;
`;

export const MenuTitle = styled.h2`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3vh;
`;

export const Item = styled.div`
    display: flex;
    height: 12vh;
    gap: 2vh;
`;

export const ItemImage = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 14px;
    flex: 3;
    padding: 0.5vh;

    img {
        max-width: 90%;
        height: auto;
        transition: transform 0.5s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
`;

export const ItemText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 6;
    color: ${({ theme }) => theme.colors.text};

    .name {
        font-size: 22px;
        font-weight: 600;
        line-height: 1.2;
    }

    .class {
        font-size: 12px;
        line-height: 1.2;
    }
`;

export const ItemPrice = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5vh;
    flex: 2;
    justify-content: end;
    color: ${({ theme }) => theme.colors.text};

    .currency {
        font-size: 14px;
        font-weight: 600;
    }

    .value {
        font-size: 24px;
        font-weight: bold;
    }

    .reais {
        font-size: 24px;
    }

    .centavos {
        font-size: 14px;
    }
`;