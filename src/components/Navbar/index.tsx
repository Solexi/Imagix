import {Flex, Image, Input, InputGroup, InputRightElement, Link as ChakraLink, Icon, Badge } from "@chakra-ui/react";
import imagixLogo from '../../assets/icon-logo.png';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from "react-router-dom";
import { FaCheckCircle, FaUser } from "react-icons/fa";

interface NavbarProps {
    onSearch: (query: string) => void;
    onClearSearch: () => void; // Add the onClearSearch prop
}
const Navbar: React.FC<NavbarProps> = ({ onSearch, onClearSearch }) => {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [clearQuery, setClearQuery] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect (() => {
        const auth = getAuth();

        // Check if the user is already logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    })


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
            {!isLoggedIn ? (
                <ChakraLink
                    as={Link}
                    cursor={"pointer"}
                    to={"/login"}
                    color={"#FFFFFF"}
                    // fontSize={"14px"}
                    fontWeight={700}
                    fontFamily={"Poppins"}
                    _hover={{borderBottom: "3px solid #036"}}
                >
                    Login
                </ChakraLink>
            ) : (
                <Flex>
                <Icon
                    as={FaUser}
                    w={"40px"}
                    h={"30px"}
                />
                {/* <Badge  
                    borderRadius="50%" 
                    // px={"6px"}
                    h={"14px"}
                    fontSize={"12px"} fontWeight={900} textAlign={"center"} pos={"relative"} top={"1"} right={"5"}> */}
                    <Icon
                        pos={"relative"}
                        as={FaCheckCircle}
                        top={"-1"} right={"5"}
                        color={"#000000"}
                        borderRadius={"50%"}
                        bg={"#FFFFFF"}
                    />
                {/* </Badge> */}
                </Flex>
            )}
        </Flex>
    )

}

export default Navbar;
