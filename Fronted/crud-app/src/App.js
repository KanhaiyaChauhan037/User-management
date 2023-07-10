import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './redux/usersSlice';
import UsersList from './components/UsersList';
import CreateUser from './components/CreateUser';
import ViewUser from './components/ViewUser';
import Navbar from './components/Navbar';
import { Box } from '@chakra-ui/react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:_id" element={<CreateUser />} />
        <Route path="/view/:_id" element={<ViewUser />} />
      </Routes>
    </Box>
  );
}

export default App;
