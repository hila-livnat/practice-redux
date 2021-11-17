import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNewUser, getUsers, selectUserList, userSlice } from "../store/userListSlice/userSlice";
import { User } from "../store/userListSlice/User.interface";

const db: User[] = [
    {
        firstName: 'bob',
        lastName: 'don',
        age: 32
    },
    {
        firstName: 'hila',
        lastName: 'livnat',
        age: 19,
    },
    {
        firstName: 'oded',
        lastName: 'livnat',
        age: 17
    },
]
export const Users: FC = () => {

    const dispatch = useAppDispatch()
    const usersList = useAppSelector(selectUserList)
    const status = useAppSelector(state => state.user.status)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    return (
        status ?
            <div>{status}</div>
            :
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div>new user:</div>
                <input
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                    placeholder='first name'
                />
                <input
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                    placeholder='last name'
                />
                <input
                    value={age}
                    onChange={(e) => { setAge(e.target.value) }}
                    placeholder='age'
                />
                <button
                    onClick={() => {
                        dispatch(addNewUser({ firstName, lastName, age: Number(age) }))
                        setFirstName('')
                        setLastName('')
                        setAge('')
                    }}
                >
                    <div>
                        add user
                    </div>
                </button>
                <div>users:</div>
                <table>
                    <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>age</th>

                    </tr>
                    {
                        usersList.map((item, index) => (
                            <tr>
                                <td style={{ marginLeft: 10 }}>{item.firstName}</td>
                                <td style={{ marginLeft: 10 }}>{item.lastName}</td>
                                <td style={{ marginLeft: 10 }} >{item.age}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
    )
}

