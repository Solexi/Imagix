import { Box, Icon, Text } from "@chakra-ui/react";
import { FaImage } from 'react-icons/fa';

const NoImage = () => {
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
                    <Text
                        fontSize={"100px"}
                    >
                        😕
                    </Text>
                </Box>
                <Text fontWeight="bold" fontSize="20px" mt="10px">
                    No Image found
                </Text>
            </Box>
        </Box>
    )

}

export default NoImage;