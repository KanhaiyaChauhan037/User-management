import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../redux/usersSlice";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FcBusinessman } from "react-icons/fc";

const ViewUser = () => {
  const { _id } = useParams();
  const users = useSelector(selectAllUsers);
  const user = users.find((user) => user._id === _id);
  console.log("view", _id);
  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <Box w="90%" m="auto" mt="20px">
      <Heading size="lg" textAlign={"center"}>User Details</Heading>
      <Table
        variant="simple"
        mt="20px"
        boxShadow={
          " rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
        }
        borderRadius={"5px"}
      >
        <Thead>
          <Tr bg="green.300">
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Edit</Th>
            <Th>Back</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{user._id}</Td>
            <Td>
              {" "}
              <Flex alignItems={"center"} gap="4px">
                {" "}
                <FcBusinessman />
                {user.name}
              </Flex>
            </Td>
            <Td>
              <Flex alignItems={"center"} gap="4px">
                {" "}
                <EmailIcon />
                {user.email}
              </Flex>
            </Td>
            <Td>
              <Flex alignItems={"center"} gap="4px">
                <PhoneIcon />
                {user.phone}{" "}
              </Flex>
            </Td>
            <Td>
              <Tooltip label="Edit user" fontSize="sm">
                <Link to={`/edit/${user._id}`}>
                  <Button bg="none" _hover={{ bg: "green.100" }} mr="10px">
                    <EditIcon />
                  </Button>
                </Link>
              </Tooltip>
            </Td>
            <Td>
              {" "}
              <Tooltip label="Go back" fontSize="sm">
                <Link to={"/"}>
                  <Button bg="none" _hover={{ bg: "red.100" }}>
                    <RiArrowGoBackFill />
                  </Button>
                </Link>
              </Tooltip>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ViewUser;
