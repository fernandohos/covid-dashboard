import styled from 'styled-components';

export const Container = styled.div`
    max-width: 120rem;
    margin: auto;
    @media (max-width: 670px) {
        width: 90vw;
    }
`;

export const Title = styled.h1`
    color: var(--text-color);
    font-size: 2.8rem;
    text-align: center;
    font-weight: 500;
    margin: 2.5rem auto;
`;

export const WorldStats = styled.div`   
    max-width: 60rem;
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

export const SearchBar = styled.div<{xIcon: string}>`
    max-width: 60rem;
    background: var(--gradient);
    height: 50px;
    padding: 0;
    border-radius: 1rem;
    margin-top: 3rem;

    form {
        background: var(--card-background);
        border-radius: inherit;
        margin: 0;
        padding: .3rem;
        height: 100%;
        box-sizing: border-box;

        input {
            border-radius: .8rem;
            display: block;
            width: 100%;
            height: 100%;
            margin: 0;
            outline: none;
            border: none;
            background: var(--card-background);
            box-sizing: border-box;
            padding: 1rem;
            color: var(--text-color);

            &::placeholder {
                color: var(--text-color);
            }

            &::-webkit-search-cancel-button {
                background-image: url(${props => props.xIcon});
                -webkit-appearance: none;
                background-position: center;
                background-size: cover;
                height: 15px;
                width: 15px;
            }
        }
    }

    form:focus-within {
        background: var(--card-background-transparent);
        transition: all ease .2s;
    }
`;
