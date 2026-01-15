import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-main: #333333;
    --bg-card: #171717;
    --bg-section: #1e1e1e;
    --bg-header: #151515;
  }

  @media (max-width: 768px) {
    :root {
      --bg-main: #333333;
      --bg-card: #333333;
      --bg-section: #333333;
      --bg-header: #333333;
    }
  }

  html, body, #root {
    background-color: var(--bg-main);
  }
`;
