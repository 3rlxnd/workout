import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
html {
margin: 0;
background-color:rgb(25, 24, 28);
}
  body {
  color: white;
    margin: 0;
    font-family: system-ui;
  }
`;
