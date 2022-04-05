import React from "react";
import { useState, useEffect } from 'react';
import { db } from '../firebase-config'
import { collection, getDocs, addDoc } from "firebase/firestore"

function  Demo(){
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newCell, setNewCell] = useState("");
    

    const [users, setUsers] = useState([]);
    const userRef = collection(db, "Users");

    const createUser = async () => {
        await addDoc(userRef, { name: newName, surname: newSurname,email: newEmail,cell: newCell });

    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getUsers()
    }, []);

    return (
        <div className="Demo">
            <input placeholder="Name" onChange={(event) => {
                setNewName(event.target.value)
            }} />
            <input placeholder="Surname" onChange={(event) => {
                setNewSurname(event.target.value)
            }} />
            <input placeholder="Email" onChange={(event) => {
                setNewEmail(event.target.value)
            }} />
            <input placeholder="Cell" onChange={(event) => {
                setNewCell(event.target.value)
            }} />
            <button onClick={createUser} >create user</button>

            {users.map((user) => {
                return <div>
                    <h1>NAME: {user.Name}</h1>
                    <h1>SURNAME: {user.Surname}</h1>
                    <h1>EMAIL: {user.Email}</h1>
                    <h1>CELL: {user.Cell}</h1>
                </div>
            })}
        </div>
    );

}
//this page is just a demo to help you create your page, DO NOT EDIT OR DELETE IT!!!!




export default Demo;