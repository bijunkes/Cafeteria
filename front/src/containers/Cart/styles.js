import styled from "styled-components";

export const ItemsWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: 100%;

    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 10px;
    }
`;

export const Title = styled.div`
    display: flex;
    margin-right: auto;
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
`;

export const Empty = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2vh;
    margin-top: auto;
    margin-bottom: auto;
    color: ${({ theme }) => theme.colors.text};
`;

export const Back = styled.button`
    height: 7vh;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 20px;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2vh;
    border-radius: 20px;
    width: 100%;
    height: 14vh;
    gap: 2vh;
    margin-bottom: auto;

    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
`;

export const ItemImage = styled.div`
    overflow: hidden;
    width: 10vh;
    height: 10vh;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5vh;

    h3 {
        font-size: 1rem;
        font-weight: 600;
    }

    span {
        font-size: 0.85rem;
        opacity: 0.7;
    }

    p {
        font-weight: 500;
    }
`;

export const ItemActions = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1vh;
`;

export const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 2vw;

    button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-weight: bold;
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const RemoveButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    color: red;
`;

export const Summary = styled.div`
    width: 100%;
    padding-top: 2vh;
    border-top: 2px solid ${({ theme }) => theme.colors.primary};
    display: flex;
    flex-direction: column;
    gap: 2vh;
`;

export const Total = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};

    span {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const FinishButton = styled.button`
    height: 6vh;
    border-radius: 25px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;

    background-color: ${({ theme }) => theme.colors.primary};
    color: white;

    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

    transition: 0.2s ease;

    &:hover {
        opacity: 0.9;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export const CheckoutModal = styled.div`
    background: ${({ theme }) => theme.colors.background};
    padding: 4vh;
    border-radius: 20px;
    width: 80%;
    max-width: 50vh;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    color: ${({ theme }) => theme.colors.text};
`;

export const CheckoutInput = styled.input`
    padding: 1vh;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.text};
`;

export const CheckoutButtons = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1vh;

    button {
        color: ${({ theme }) => theme.colors.text};
    }
`;