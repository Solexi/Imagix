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
            width="80px"
            height="80px"
          >
            <Spinner
              thickness="8px"
              speed="0.65s"
              emptyColor="transparent"
              color="#be123c"
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
