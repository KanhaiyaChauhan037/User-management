import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  deleteUserAsync,
  selectAllUsers,
  selectUsersLoading,
} from "../redux/usersSlice";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Tr,
  Th,
  Thead,
  Tooltip,
  Heading,
  useToast,
  Image,
  Text,
  Flex,
  Input,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import { FcBusinessman } from "react-icons/fc";

const UsersList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectUsersLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = debounce((value) => setSearchTerm(value), 200);

  const handleDelete = (userId, name) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAsync(userId));
      toast({
        title: `Deleted user @${name} successfully!`,
        status: "success",
        variant: "top-accent",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  if (loading) {
    return (
      <Box w="50%" margin={"auto"} mt="2%" textAlign={"center"}>
        <Image
          w="100%"
          m="auto"
          src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
          alt="Loading..."
        />
      </Box>
    );
  }

  return (
    <Box px="10px" w="90%" m="auto">
      <Heading textAlign={"center"} mt={"10px"} size={"lg"}>
        All Users
      </Heading>

      <Box w="40%" ml={"60%"} mt="10px">
        <Input
          type="text"
          placeholder="Search users............."
          onChange={(e) => debouncedSearch(e.target.value)}
          border={"none"}
          borderBottom={"1px solid pink"}
          _hover={{ outline: "none" }}
          _focus={{
            outline: "none",
            borderBottom: "2px solid pink",
            boxShadow: "none",
          }}
        />
      </Box>

      <Table
        mt="20px"
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
        variant="simple"
        colorScheme="gray"
        size={"sm"}
        borderRadius={"10px"}
      >
        <Thead>
          <Tr bg="green.300" h="35px">
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>View</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <Tr key={user._id}>
                <Td fontSize={"14px"}> {user._id}</Td>
                <Td fontSize={"16px"} fontWeight={400}>
                  {" "}
                  <Flex
                    alignItems={"center"}
                    gap="4px"
                    fontWeight={500}
                    _hover={{ color: "green.700" }}
                  >
                    {" "}
                    <FcBusinessman />
                    {user.name}
                  </Flex>
                </Td>
                <Td w="20px">
                  <Tooltip label="View more info" fontSize="sm">
                    <Link to={`/view/${user._id}`}>
                      <Button bg="none" _hover={{ bg: "green.100" }}>
                        <ViewIcon />
                      </Button>
                    </Link>
                  </Tooltip>{" "}
                </Td>
                <Td w="20px">
                  <Tooltip label="Edit user" fontSize="md">
                    <Link to={`/edit/${user._id}`}>
                      <Button
                        bg="none"
                        _hover={{ bg: "green.100" }}
                        title="Edit user"
                      >
                        <EditIcon />{" "}
                      </Button>
                    </Link>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label="Delete user" fontSize="md">
                    <Button
                      bg="none"
                      _hover={{ bg: "red.100" }}
                      onClick={() => handleDelete(user._id, user.name)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UsersList;
