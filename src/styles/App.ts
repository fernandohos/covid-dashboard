import styled from 'styled-components';

export const Container = styled.div`
    max-width: 120rem;
    margin: auto;
`;

export const Title = styled.h1`
    color: var(--text-color);
    font-size: 2.8rem;
    text-align: center;
    font-weight: 500;
    margin: 2.5rem auto;
`;

export const WorldStats = styled.div`
    max-width: 600px;
    width: 100%;
    text-align: center;
    margin: auto;

    h2 {
        font-weight: 400;
        font-size: 2.4rem;
        margin-top: 1rem;
    }
`;

export const CasesWrapper = styled.div`
    display: flex;

    div {
        flex: 1;

        h3 {
            font-size: 1.5rem;
            line-height: 1.5rem;
            font-weight: 300;
            margin: 0;
            color: var(--text-color);
        }
        p {
            font-size: 2.5rem;
        }
        
        &:nth-child(1) {
            color: var(--confirmed-font-color);
            text-align: left;
        }
        &:nth-child(2) {
            color: var(--deaths-font-color);
            text-align: right;
        }
    }

`;