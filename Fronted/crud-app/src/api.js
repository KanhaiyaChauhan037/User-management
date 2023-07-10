import axios from 'axios';

const API_URL = 'https://crud-assign.onrender.com';

export const getUsers = async () => {
     try {
          const response = await axios.get(`${API_URL}/users`);
          return response.data;
     } catch (error) {
          throw new Error('Failed to fetch users.');
     }
};

export const createUser = async (user) => {
     try {
          const response = await axios.post(`${API_URL}/users`, user);
          return response.data;
     } catch (error) {
          throw new Error('Failed to create user.');
     }
};

export const updateUser = async (userId, user) => {
     try {
          const response = await axios.put(`${API_URL}/users/${userId}`, user);
          return response.data;
     } catch (error) {
          throw new Error('Failed to update user.');
     }
};

export const deleteUser = async (userId) => {
     try {
          await axios.delete(`${API_URL}/users/${userId}`);
     } catch (error) {
          throw new Error('Failed to delete user.');
     }
};
