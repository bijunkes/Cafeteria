import styled from 'styled-components';
import HeroImage from '../../assets/HeroImage.png';
import { Container } from '../Background/styles';

export const Hero = styled.section`
    position: sticky;
    top: 0;
    width: 100%;
    height: 15vh;
    z-index: 1;
    cursor: default;

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

export const ContentHero = styled(Container)`
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
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const Search = styled.div `
    position: absolute  ;
    height: 6vh;
    width: calc(100% - 8vh);
    bottom: 0vh;
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

export const FloatingTheme = styled.div`
    position: fixed;
    top: 3vh;
    right: 3vh;
    z-index: 1;

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
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.primary};
`;
