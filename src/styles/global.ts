import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --gray-900: #292929;
    --gray-800: #414141;
    --gray-700: #4F4F4F;
    --gray-500: #8F8F8F;
    --white: #FFFFFF;

    --green-500: #28DF99;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: var(--gray-900);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--gray-700);
      border-radius: 2rem;
    }
  }
  
  @media (max-width:1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width:720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--gray-900);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, select, button {
    font: 400 1rem "Roboto", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;