import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
  --primary-color: #28272E
  }

html {
margin: 0;
background-color:rgb(25, 24, 28);
}
  body {
  color: white;
    margin: 0;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;
