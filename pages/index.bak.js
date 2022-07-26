import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";

export default function Home() {
  const { toggleColorMode } = useColorMode();
  const formBg = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex direction={"column"} background={formBg} p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <Input
          placeholder={"Username"}
          variant={"filled"}
          mb={3}
          type={"email"}
        />
        <Input
          placeholder={"*****"}
          variant={"filled"}
          mb={3}
          type={"password"}
        />
        <Button mb={6} colorScheme={"teal"}>Login</Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  );
}
