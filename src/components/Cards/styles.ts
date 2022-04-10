import styled from 'styled-components';

export const Container = styled.div`
    max-width: 115rem;
    display: grid;
    grid-template-columns: repeat(4, 25rem);
    grid-auto-rows: 1fr;
    width: max-content;
    grid-gap: 5rem;
    margin: 5rem auto;
    justify-items: center;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 25rem);
    }
    
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 25rem);
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, 25rem);
    }
`;

export const LoaderContainer = styled.div`
    margin: 5rem auto;
`;