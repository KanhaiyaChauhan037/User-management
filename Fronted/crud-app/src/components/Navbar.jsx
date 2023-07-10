import { Avatar, Box, Flex, Text, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <Flex
      padding="5px"
      justifyContent={"space-between"}
      alignItems={"center"}
      // border="1px solid red"
      bg={"gray.100"}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
    >
      <Link to="/">
        {" "}
        <Flex alignItems={"center"} gap="10px" ml="20px">
          <Avatar src="https://bit.ly/broken-link" />
          <Text fontSize={"20px"}>User Management system</Text>
        </Flex>
      </Link>
      <Box mr="20px">
        <Link to="/create">
          <Button bg="green.400" _hover={{bg:"green.300"}}>
            <AddIcon mr="2px" /> Add User
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
