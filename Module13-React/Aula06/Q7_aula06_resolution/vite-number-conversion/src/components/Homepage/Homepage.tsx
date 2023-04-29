//import "./Homepage.css";

import styled from "styled-components";

const MainTitle = styled.h1`
    padding: 20px;
    font-size: 40px;
    color: blue;
    text-align: center;
    background-color: yellow;
`;

export default function Homepage() {
    return <MainTitle>Home: sua página logada</MainTitle>;
}
