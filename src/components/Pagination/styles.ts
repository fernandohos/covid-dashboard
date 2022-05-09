import styled from 'styled-components';

export const Container = styled.div`
    margin: 5rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 90vw;
    max-width: 115rem;
`;

export const ButtonChangePage = styled.div`
    border-radius: 50%;
    background: var(--gradient);
    padding: .3rem;
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    .border {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card-background);
        border-radius: 50%;
    }
`;

export const PagesContainer = styled.nav<{pageCount: number}>`
    background: var(--gradient);
    height: 5.6rem;
    box-sizing: border-box;
    margin: 0 2rem;
    border-radius: 1rem;
    width: calc(90vw - 12.6rem);
    max-width: calc(${props => props.pageCount} * (3.5rem + (1.5rem * 2)));

    .wrapper {
        width: 100%;
        height: 100%;
        background: var(--card-background);
        border-radius: .8rem;
        
        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 5px;
            background: transparent;
            border-radius: .8rem;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--gradient);
            border-radius: 10px;
        }

        .scroll {
            display: flex;
            align-items: center;
            justify-content: center;
            width: max-content;
            height: 100%;
        }
    }
`;

export const PageLink = styled.div<{currentPage: number}>`
    width: 3.5rem;
    height: 3.5rem;
    margin: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(${({currentPage}) => currentPage}) {
        background: #c4c4c488;
    }

    &:hover {
        background: #c4c4c455;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: inherit;
        height: inherit;
        color: var(--text-color);
        font-size: 2rem;
        text-decoration: none;
    }
`;