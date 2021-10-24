import styled from 'styled-components';

export const Container = styled.div`
    background: var(--gradient);
    width: 25rem;
    border-radius: 1.4rem;
    
    .wrapper {
        background: var(--card-background);
        padding: 1.5rem;
        border-radius: 1rem;
        height: 100%;
        box-sizing: border-box;

        &>div {
            display: flex;
            justify-content: space-between;
        }
    }
`;

export const Border = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: var(--card-background);
    padding: .3rem;
    border-radius: 1.4rem;

    &:hover {
        background: var(--card-background-transparent);
        transition: all ease .2s;
    }
`;

export const CountryName = styled.p`
    font-size: 1.8rem;
`;

export const CountryAbbr = styled.p`
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: .5rem;
`;

export const StatsTitle = styled.p`
    font-size: 1.3rem;
    line-height: 1.3rem;
    margin-top: 1rem;
`;

export const StatsInfo = styled.p<{color: string}>`
    color: ${props => props.color};
    font-size: 2.2rem;
`;

