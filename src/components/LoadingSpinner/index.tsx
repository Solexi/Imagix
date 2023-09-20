import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
      <Box width="100%">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box
            display="inline-block"
            position="relative"
            width="180px"
            height="180px"
          >
            <Spinner
              thickness="8px"
              speed="0.65s"
              emptyColor="transparent"
              color="#FFFFFF"
              h={"100px"}
              w={"100px"}
            />
          </Box>
          <Text fontWeight="bold" fontSize="20px" mt="20px">
            Loading...
          </Text>
        </Box>
      </Box>
  );
};

export default Loader;
