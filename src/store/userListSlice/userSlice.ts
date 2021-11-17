import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import fetchUsers from "../../functions/fetchUsers";
import { AppThunk, RootState } from "../store"
import { User } from "./User.interface"
interface InitialState {
    userList: User[];
    status: string | null;
}

const initialState: InitialState = {
    userList: [],
    status: 'fetch users'
}

export const getUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const response = await fetchUsers();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            // let newuserList = [...state.userList]
            // newuserList.push(action.payload)
            // re
            state.userList.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsers.pending, (state) => {
            state.status = 'loading'
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.status = null
            state.userList = action.payload
        }).addCase(getUsers.rejected, (state) => {
            state.status = 'rejected'
        })
    }
})

export const addNewUser = (newUser: User): AppThunk => (
    dispatch,
    getState
) => {
    if (!newUser.firstName || !newUser.lastName || !Number(newUser.age)) {
        alert('check your values')
    } else {
        dispatch(addUser(newUser))
    }
};

export const { addUser } = userSlice.actions
export const selectUserList = (state: RootState) => state.user.userList

const userReducer = userSlice.reducer;
export default userReducer;