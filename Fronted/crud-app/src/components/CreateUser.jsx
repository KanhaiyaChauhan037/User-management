import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  updateUserAsync,
  selectAllUsers,
} from "../redux/usersSlice";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";

const CreateUser = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  console.log("edit", _id);

  const isEditMode = !!_id;
  const buttonText = isEditMode ? "Update" : "Create";

  useEffect(() => {
    if (isEditMode) {
      const user = users.find((user) => user._id === _id);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      } else {
        // navigate("/");
      }
    }
  }, [_id, isEditMode, users, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      phone,
    };

    if (isEditMode) {
      dispatch(updateUserAsync({ userId: _id, user }));
      toast({
        title: `Updated user @${name} successfully!`,
        status: "success",
        variant: "top-accent",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(createUserAsync(user));
      toast({
        title: `Created new user @${name} successfully!`,
        status: "success",
        variant: "top-accent",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }

    navigate("/");
  };

  return (
    <Box>
      <Box
        w="35%"
        m="auto"
        mt="35px"
        padding={"20px"}
        boxShadow={
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;"
        }
      >
        <Heading textAlign={"center"} size={"md"}>
          {isEditMode ? "Edit User" : "Create User"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone:</FormLabel>
            <Input
              type="text"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormControl>
          <Flex alignItems={"center"}>
            <Button
              ml={"37%"}
              mt="20px"
              w="26%"
              bg="green.500"
              color={"white"}
              fontSize={"18px"}
              _hover={{ bg: "green" }}
              type="submit"
            >
              {buttonText}
            </Button>
            <Tooltip label="Go back" fontSize="sm">
              <Link to={"/"}>
                <Button
                  mt="20px"
                  ml={"20%"}
                  bg="none"
                  _hover={{ bg: "red.100" }}
                >
                  <RiArrowGoBackFill />
                </Button>
              </Link>
            </Tooltip>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default CreateUser;
