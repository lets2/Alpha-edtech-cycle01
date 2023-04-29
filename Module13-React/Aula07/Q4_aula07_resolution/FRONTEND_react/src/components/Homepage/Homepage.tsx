//import "./Homepage.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import UpdateCard from "../UpdateCard/UpdateCard";
import styled from "styled-components";

const MainTitle = styled.h1`
    padding: 20px;
    font-size: 40px;
    color: blue;
    text-align: center;
    border-bottom: 0px solid blue;
`;

export default function Homepage() {
    return (
        <>
            <MainTitle>Home: sua página logada</MainTitle>
            <ProfileCard />
            <UpdateCard />
        </>
    );
}
