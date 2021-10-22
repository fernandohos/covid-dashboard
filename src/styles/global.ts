import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
    }
    html {
        --background: #1B283A;
        --card-background: #243143;
        --gradient: linear-gradient(135deg, #ff6701, #ff0973);
    }
    body {
        background: var(--gradient);
    }
`;