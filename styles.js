import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
*,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;
