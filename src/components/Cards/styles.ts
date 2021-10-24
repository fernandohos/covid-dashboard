import styled from 'styled-components';

export const Container = styled.div`
    max-width: 115rem;
    display: grid;
    grid-template-columns: repeat(4, 25rem);
    width: max-content;
    grid-gap: 5rem;
    margin: 5rem auto;
    justify-items: center;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 25rem);
    }
`;