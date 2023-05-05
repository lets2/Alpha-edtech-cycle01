import React from "react";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
const BoxDiv = styled.div`
    background-color: blue;
    border: 2px solid #000000;
    border-radius: 20px;
    padding: 10px 30px;
    margin: 10px auto;
    color: white;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
        width: 100%;
        text-align: center;
        font-size: 30px;
    }
    span {
        font-weight: bold;
        font-size: 25px;
    }
    p {
        font-size: 25px;
    }
`;

export default function ProfileCard() {
    const { user, setUser } = useContext(UserContext);
    return (
        <BoxDiv>
            <h2>Profile</h2>
            <p>
                <span>Name:</span> {user?.name}
            </p>
            <p>
                <span>E-mail:</span> {user?.email}
            </p>
        </BoxDiv>
    );
}
