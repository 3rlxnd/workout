import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
html {
margin: 0;
background-color: #0C0B10;
}
  body {
  color: white;
    margin: 0;
    font-family: system-ui;
  }
`;
