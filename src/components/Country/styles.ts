import styled from 'styled-components';

export const Container = styled.div`
    width: 90vw;
    border-radius: 1rem;
    background: var(--gradient);
    padding: .3rem;
    box-sizing: border-box;
    margin: auto;
    
    .container {
        display: grid;
        grid-template-columns: 4fr 1fr;
        grid-column-gap: 3rem;
        width: 100%;
        height: 100%;
        border-radius: .8rem;
        background: var(--card-background);
        box-sizing: border-box;
        padding: 2rem;

        @media (max-width: 870px) {
            grid-template-columns: 3fr 1fr;
        }

        @media (max-width: 700px) {
            grid-template-columns: 1fr;
        }
    }

    aside {
        height: min-content;
        background: var(--chart-card-background);
        padding: 2rem;
        text-align: center;

        @media (max-width: 700px) {
            display: none;
        }

        svg {
            width: 100%;
            path {
                width: 100%;
            }
        }
        p {
            font-size: 1.4rem;
        }
        
        img.country-flag {
            width: 80%;
            margin-top: 2rem;
        }
    }
`;

export const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: bold;
`;

export const Main = styled.main`
    width: 4fr;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    grid-auto-rows: min-content;


    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }

    div h3 {
        font-size: 1.5rem;
        font-weight: 400;
    }

    div h2 {
        font-size: 2rem;
        font-weight: 400;
    }
`;

export const Cases = styled.p<{color: string}>`
    font-size: 2.2rem;
    color: ${({color}) => color};
`;

export const Chart = styled.div`
    width: 100%;
    canvas {
        width: 100% !important;
    }
    background: var(--chart-background);

`;