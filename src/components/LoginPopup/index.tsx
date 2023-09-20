import React from "react";
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex={10}
    >
      <Box
        p={4}
        backgroundColor="#131313"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h5" size="md" mb={4}>
          Please Log In
        </Heading>
        <Text mb={4}>You need to log in to use the drag-and-drop feature.</Text>
        <Button colorScheme="teal" onClick={handleLogin}>
          Log In
        </Button>
      </Box>
    </Center>
  );
};

export default LoginPopup;
