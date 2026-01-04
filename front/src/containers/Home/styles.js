import styled from 'styled-components';
import HeroImage from '../../assets/HeroImage.png';

export const Background = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    height: 100vh;
    width: 100vw;
`;

export const Hero = styled.section`
    position: relative;
    width: 100%;
    height: 17vh;

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

    &:hover{
        font-size: 23px;
    }
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

export const SearchInput = styled.input `
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.div `
    height: 12vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    padding: 0vh 10vh;

    background-color: ${({ theme }) => theme.colors.primary};
`;

export const FooterButton = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    cursor: pointer;

    color: ${({ theme }) => theme.colors.text};

    &:hover{
        font-size: 13px;
    }
`;