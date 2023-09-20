import { Box, Flex, Image, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import imagixLogo from '../../assets/icon-logo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
    onSearch: (query: string) => void;
    onClearSearch: () => void; // Add the onClearSearch prop
}
const Navbar: React.FC<NavbarProps> = ({ onSearch, onClearSearch }) => {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [clearQuery, setClearQuery] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        handleSearch();
        if (newQuery.trim() !== '') {
            setShowResults(true);
            setClearQuery(true)
            console.log(newQuery)
        } else {
            setShowResults(false);
            setClearQuery(false);
        }
    };

    const handleClearQuery = (e: any) => {
        setQuery("");
        onClearSearch();
        setShowResults(false);
        setClearQuery(false);
    }

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <Flex
            as={"nav"}
            dir={"row"}
            w={"100vw"}
            justify={"space-between"}
            h={"68px"}
            position={"fixed"}
            align={"center"}
            px={"20px"}
            zIndex={2}
            bg={"#131313"}
            borderBottom={"6px solid #292929"}
        >
            <Image
                src={imagixLogo}
                w={"130px"}
                h={"48px"}
            />
            <Flex>
                <InputGroup>
                    <Input
                        value={query}
                        zIndex={2}
                        w={"36.46vw"}
                        placeholder={"Search by tags..."}
                        h={"36px"}
                        color={"#000000"}
                        fontSize={"16px"}
                        fontWeight={400}
                        bg={"#FFFFFF"}
                        border={"2px solid #D1D5DB"}
                        px={"10px"}
                        borderRadius={"6px"}
                        mx={150}
                        _placeholder={{
                            color: "#000000",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    {clearQuery ? (
                        <InputRightElement
                            position={"relative"}
                            left={-188}
                            top={-0.5}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                color="#FFFFFF"
                                style={{ background: "#131313", padding: "7px", borderTopRightRadius: "3px", borderBottomRightRadius: "3px" }}
                                onClick={handleClearQuery}
                            />
                        </InputRightElement>) : (
                        <InputRightElement
                            children={
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    color="#FFFFFF"
                                    style={{ background: "#131313", padding: "7px", borderTopRightRadius: "3px", borderBottomRightRadius: "3px" }}
                                />
                            }
                            position={"relative"}
                            left={-188}
                            top={-0.5}
                        />
                    )}
                </InputGroup>
            </Flex>
            Login
        </Flex>
    )

}

export default Navbar;


// import React, { useState } from "react";
// import { Input, Box, Grid, GridItem } from "@chakra-ui/react";
// import { Image } from "./Image"; // Import your Image component

// const ImageGallery = ({ images }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter images based on the search query
//   const filteredImages = images.filter((image) =>
//     image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <div>
//       <Input
//         placeholder="Search by tag..."
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />

//       <Grid templateColumns="repeat(3, 1fr)" gap={4}>
//         {filteredImages.map((image) => (
//           <GridItem key={image.id}>
//             <Image src={image.url} alt={`Image ${image.id}`} />
//           </GridItem>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default ImageGallery;
