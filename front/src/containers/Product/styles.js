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