import { User } from "../store/userListSlice/User.interface";

const users: User[] = [
    {
        firstName: 'Oded',
        lastName: 'Livnat',
        age: 17
    },
    {
        firstName: 'Gilad',
        lastName: 'Livnat',
        age: 13
    },
    {
        firstName: 'Hadas',
        lastName: 'Livnat',
        age: 9
    },
]

export default function fetchUsers() {
    return new Promise<{ data: User[] }>((resolve, reject) => {
        const rundomNum = Math.random()
        setTimeout(() => {
            if (rundomNum > 0.5) {
                resolve({ data: users })
            }else{
                reject('rejected')
            }
        }, 3000);

    })
}