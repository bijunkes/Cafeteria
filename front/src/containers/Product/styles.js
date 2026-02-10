import styled from "styled-components";

export const BackImage = styled.div`
    height: 40vh;
    width: 100%;
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.colors.secondary} 75%,
        transparent 25%
    );
`;

export const Image = styled.div`
    position: fixed;
    top: 10vh;
    right: 50%;
    transform: translateX(50%);
    z-index: 2;
    width: 30vh;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
        display: block;
    }

    @media (min-width: 768px) {
        width: 240px;
    }
`;

export const Content = styled.div`
    display: flex;
    padding: 0vh 4vh;
    flex-direction: column;
    gap: 1vh;
    justify-content: center;
    min-height: calc(100vh - 55vh);
`;

export const Rating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    font-size: 16px;
    border-radius: 20px;
    height: 6vh;
    width: 14vh;
    gap: 0.5vh;
    color: ${({ theme }) => theme.colors.text};

    .material-icons-outlined {
        font-size: 18px;
    }
`;

export const Title = styled.div`
    font-size: 26px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`;

export const Price = styled.div`
    display: flex;
    align-items: center;
    gap: 1vh;
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

export const Subtitle = styled.div`
    font-size: 14px;
    margin-top: 1.5vh;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
`;

export const Size = styled.div`
    display: flex;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 1vh;
    width: 100%;
    justify-content: center;
    border-radius: 20px;
    cursor: pointer;

    background-color: ${({ $active, theme }) =>
        $active ? theme.colors.primary : theme.colors.secondary};

    color: ${({ $active, theme }) =>
        $active ? theme.colors.white : theme.colors.text};

    opacity: ${({ $active }) => ($active ? 1 : 0.7)};

    &:hover {
        opacity: 1;
    }
`;

export const Description = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Quantity = styled.div`
    color: ${({ theme }) => theme.colors.text};
    border: 2px ${({ theme }) => theme.colors.text} solid;
    height: 5vh;
    width: 20vh;
    border-radius: 20px;
`;