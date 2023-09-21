import React from "react";
import { Box, Button, Center, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaCross, FaTimes } from "react-icons/fa";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface LoginPopupProps {
  onLogin: () => void;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onLogin, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate("/login"); // Redirect to the login page
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex={10}
      fontFamily={"Poppins"}
    >
      <Box
        p={7}
        backgroundColor="#131313"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Flex
            justifyContent={"right"}
            fontWeight={100}
        >
            <Icon
                as={FaTimes}
                style={{
                    cursor: "pointer",
                }}
                size={"sm"}
                onClick={handleClose}
            />
        </Flex>
        <Heading as="h4" size="md" mb={7}>
          Log in for full access
        </Heading>
        <Text fontSize={"14px"} mb={4} color={"#A7A7A7"}>You need to log in to use the drag-and-drop feature.</Text>
        <Button colorScheme="telegram" onClick={handleLogin} py={-3} cursor={"pointer"} _hover={{bg: "#0074AE"}}>
          Log In
        </Button>
      </Box>
    </Center>
  );
};

export default LoginPopup;
