import React from "react";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
const BoxDiv = styled.div`
    border: 2px solid blue;
    padding: 10px 30px;
    margin: 10px auto;
    color: blue;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export default function ProfileCard() {
    const { user, setUser } = useContext(UserContext);
    return (
        <BoxDiv>
            <h3>Perfil</h3>
            <p>Email: {user?.email}</p>
        </BoxDiv>
    );
}
