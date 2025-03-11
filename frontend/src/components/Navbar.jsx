import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons"; // Import icon
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxH={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        {/* Button to Create Page */}
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize = {20} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar