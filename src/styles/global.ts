import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        font-family: 'Poppins', sans-serif;
    }
    html {
        --background: #1B283A;
        --card-background: #243143;
        --card-background-transparent: #24314300;
        --chart-card-background: #2D3A4C;
        --gradient: linear-gradient(135deg, #ff6701, #ff0973);
        --text-color: #fff;
        --confirmed-font-color: #44ff44;
        --deaths-font-color: #ff4444;
        font-size: 62.5%;
        scroll-behavior: smooth;
    }
    body {
        font-size: 2.0rem;
        background: var(--background);
        color: var(--text-color)
    }

    @media (prefers-color-scheme: light) {
        html {
            --background: #F3F6FF;
            --card-background: #fff;
            --chart-card-background: #FCFCFC;
            --gradient: linear-gradient(135deg, #ff6701, #ff0973);
            --text-color: #2b2b2b;
            --confirmed-font-color: #44ff44;
            --deaths-font-color: #ff4444;
        }
    }
`;