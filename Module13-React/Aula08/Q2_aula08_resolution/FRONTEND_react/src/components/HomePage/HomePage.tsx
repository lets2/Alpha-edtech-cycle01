//import "./Homepage.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import UpdatePage from "../UpdatePage/UpdatePage";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
const MainTitle = styled.h1`
    padding: 20px;
    font-size: 40px;
    color: blue;
    text-align: center;
    border-bottom: 0px solid blue;
`;

const MenuBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 400px;
    margin: 20px auto;
    color: black;
    button {
        margin: 10px;
        padding: auto 150px;
        background-color: #d34917;
        color: white;
        transition: 0.2s;
    }
    button:hover {
        background-color: #d34917;
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
    }
`;

export default function Homepage() {
    const { user } = useContext(UserContext);

    if (user && user.name.length) {
        return (
            <>
                <MainTitle>Home: your logged in page</MainTitle>
                <MenuBox>
                    <button>
                        <Link to={"/update"} style={{ color: "white" }}>
                            Update registration
                        </Link>
                    </button>
                    <button>
                        {" "}
                        <Link to={"/"} style={{ color: "white" }}>
                            Log out
                        </Link>
                    </button>
                </MenuBox>
                <ProfileCard />
            </>
        );
    } else {
        return <Navigate to="/" />;
    }
}
