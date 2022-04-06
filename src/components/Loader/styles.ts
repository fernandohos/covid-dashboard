import styled, {keyframes} from 'styled-components';

const loadingAnimation = keyframes`
    from {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
`;

export const Loader = styled.div`
    margin: auto;
    display: block;
    position: relative;
    width: 80px;
    height: 80px;

    .a {
        padding: 4px;
        background: var(--gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        opacity: 1;
        border-radius: 50%;
        animation: ${loadingAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .b {
        width: 100%;
        height: 100%;
        background: var(--background);
        border-radius: 50%;
    }

    .a:nth-child(2) {
        animation-delay: -0.5s;
    }
`;