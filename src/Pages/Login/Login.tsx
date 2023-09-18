import { Box, Icon, Image, Flex, Text, FormControl, FormLabel, Input, FormErrorMessage, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../../firebase/config"; // Import the auth service
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import imagixLogo from '../../assets/icon-logo.png';
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Logged in user:", user);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Box
            // bg={"#000000"}
            w={"100%"}
            h={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
        >
            <Icon
                as={Image}
                src={imagixLogo}
                w={"268px"}
                h={"96px"}
                mb={"30px"}
            />
            <Box
                w={"448px"}
                bg={"#FFFFFF"}
                borderRadius={"10px"}
                alignSelf={"center"}
                shadow={"outline"}
                pb={"25px"}
                pt={"30px"}
                fontWeight={700}
                lineHeight={"24px"}
            >
                <Flex
                    flexDirection={"column"}
                >
                    <Text
                        textAlign={"center"}
                        fontSize={"24px"}
                        fontWeight={700}
                        fontFamily={"Poppins"}
                        lineHeight={"14px"}
                        color={"#000000"}
                        pb={"20px"}
                    >
                        Login to your account
                    </Text>
                    <Flex fontFamily={"Poppins"} mx={["20px", "20px", "24px", "26px", "35px", "35px"]}>
                        <form>
                            <FormControl isInvalid={emailError !== ''}>
                                <FormLabel fontSize={"14px"} mb={"6px"} mt={"15px"} color={"#000000"}>Email Address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={"Enter your email address"}
                                    fontSize={"14px"}
                                    fontWeight={500}
                                    p={"16px"}
                                    py={"4px"}
                                    bg={"#000000"}
                                    borderRadius={5}
                                    w={"376px"}
                                    required
                                />
                                <FormErrorMessage color={"red"} fontSize={"12px"}>{emailError}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={"14px"} mb={"6px"} mt={"15px"} color={"#000000"}>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder={"Enter your password"}
                                        fontSize={"14px"}
                                        fontWeight={500}
                                        p={"16px"}
                                        py={"4px"}
                                        bg={"#000000"}
                                        borderRadius={5}
                                        w={"376px"}
                                        required
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            aria-label={"show-password"}
                                            icon={showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>}
                                            onClick={() => setShowPassword(!showPassword)}
                                            bg={"transparent"}
                                            _hover={{color: "#718096"}}
                                            my={"15px"}
                                            mr={"10px"}
                                            border={"0px"}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage color={"red"} fontSize={"12px"}>{passwordError}</FormErrorMessage>
                            </FormControl>

                            {error && (
                                <Text
                                    color={"red"}
                                    fontSize={"12px"}
                                    mt={"4px"}
                                    mb={"2px"}
                                >
                                    {error}
                                </Text>
                            )}
                        </form>
                    </Flex>
                </Flex>
            </Box>
        </Box>
        // <VStack spacing={4}>
        //   <FormControl>
        //     <FormLabel>Email</FormLabel>
        //     <Input type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        //   </FormControl>
        //   <FormControl>
        //     <FormLabel>Password</FormLabel>
        //     <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //   </FormControl>
        //   <Button onClick={handleLogin}>Login</Button>
        //   {/* {user && <div>Logged in as: {user}</div>} */}
        // </VStack>
    );
}

export default Login;
