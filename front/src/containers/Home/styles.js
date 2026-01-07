import styled from 'styled-components';
import HeroImage from '../../assets/HeroImage.png';

export const Background = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
`;

export const Hero = styled.section`
    position: sticky;
    top: 0;
    width: 100%;
    height: 17vh;
    z-index: 1;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url(${HeroImage});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.4;
    }

    transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(-110%)"};

    transition: transform 1s ease;
`;

export const OverlayHero = styled.div`
    position: absolute;
    inset: 0;

    background-color: ${({ theme }) => theme.colors.ternary};
`;

export const ContentHero = styled.div`
    position: relative;
    z-index: 1;

    height: 120%;
    display: flex;
    align-items: center;
    padding: 4vh;
    flex-direction: column;
    gap: 2vh;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.text};
    font-size: 30px;
`;

export const Theme = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 100%;
    padding: 1.2vh;
    margin-left: auto;

    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const Search = styled.div `
    position: absolute  ;
    height: 6vh;
    width: calc(100% - 8vh);
    bottom: 1vh;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0vh 2vh;
    gap: 1vh;
    font-size: 15px;
    
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
`;

export const Classes = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 5vh 0vh 3vh 0vh;
    gap: 4vh;

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

export const Options = styled.div`
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
    background-color: ${({ theme }) => theme.colors.secondary};
    width: 10vh;
    border-radius: 14px;
    flex: 2;
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
`;

export const Option = styled.div`
    flex: 0 0 auto;
    display: flex;
    height: 21vh;
    width: 17vh;
    border-radius: 20px;
    padding: 1.5vh;
    background-color: ${({ theme }) => theme.colors.secondary};
    align-items: end;
    justify-content: center;
`;

export const OptionText = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 12vh;
    z-index: 10;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    padding: 0vh 10vh;

    background-color: ${({ theme }) => theme.colors.primary};

    transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(110%)"};

    transition: transform 1s ease;
`;

export const FooterButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    cursor: pointer;

    color: ${({ theme }) => theme.colors.text};

    &:hover{
        transform: scale(1.2);
    }
`;