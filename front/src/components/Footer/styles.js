import styled from 'styled-components';
import { Container } from '../Background/styles';

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

export const FooterContent = styled(Container)`
  display: flex;
  justify-content: space-around;
`;

export const FooterButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    cursor: pointer;

    color: ${({ theme }) => theme.colors.text};
    opacity: ${({ active }) => (active ? 1 : 0.6)};

    transition: transform 0.2s ease, opacity 0.2s ease;

    span {
        font-size: ${({ active }) => (active ? "28px" : "22px")};
        transition: font-size 0.2s ease;
    }

    &:hover{
        transform: scale(1.2);
        opacity: 1;
    }
`;