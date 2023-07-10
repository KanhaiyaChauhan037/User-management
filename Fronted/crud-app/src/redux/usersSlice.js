import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, createUser, updateUser, deleteUser } from '../api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
     const response = await getUsers();
     return response;
});

export const createUserAsync = createAsyncThunk(
     'users/createUser',
     async (user) => {
          const response = await createUser(user);
          return response;
     }
);

export const updateUserAsync = createAsyncThunk(
     'users/updateUser',
     async ({ userId, user }) => {
          const response = await updateUser(userId, user);
          return response;
     }
);

export const deleteUserAsync = createAsyncThunk(
     'users/deleteUser',
     async (userId) => {
          await deleteUser(userId);
          return userId;
     }
);

const usersSlice = createSlice({
     name: 'users',
     initialState: {
          users: [],
          loading: false,
          error: null,
     },
     reducers: {},

     
     extraReducers: (builder) => {
          builder
               .addCase(fetchUsers.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.users = action.payload;
                    state.loading = false;
                    state.error = null;
               })
               .addCase(fetchUsers.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })
               .addCase(createUserAsync.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(createUserAsync.fulfilled, (state, action) => {
                    state.users.push(action.payload);
                    state.loading = false;
                    state.error = null;
               })
               .addCase(createUserAsync.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })
               .addCase(updateUserAsync.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(updateUserAsync.fulfilled, (state, action) => {
                    const updatedUser = action.payload;
                    const index = state.users.findIndex((user) => user._id === updatedUser._id);
                    if (index !== -1) {
                         state.users[index] = updatedUser;
                    }
                    state.loading = false;
                    state.error = null;
               })
               .addCase(updateUserAsync.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               })
               .addCase(deleteUserAsync.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(deleteUserAsync.fulfilled, (state, action) => {
                    const userId = action.payload;
                    state.users = state.users.filter((user) => user._id !== userId);
                    state.loading = false;
                    state.error = null;
               })
               .addCase(deleteUserAsync.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               });
     },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.users;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
