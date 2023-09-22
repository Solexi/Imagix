import React, { useEffect, useState } from "react";
import { Box, Image, Flex, Text, Input, InputGroup, Skeleton } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { imageData } from "../../static";
import LoadingSpinner from "../../components/LoadingSpinner";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoginPopup from "../../components/LoginPopup/index";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { motion } from "framer-motion";
import NoImage from "../../components/NoImage";
import { TouchBackend } from "react-dnd-touch-backend";

interface ImageData {
    id: number;
    url: string;
    tags: string[];
}

const Home = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [noImages, setNoImages] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        // Initialize Firebase authentication
        const auth = getAuth();

        // Check if the user is already logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        const fetchImages = async () => {
            try {
                // Simulate loading delay for demonstration purposes
                setTimeout(() => {
                    setImageLoading(true);
                    setLoading(false);
                    setImages(imageData);
                    setImageLoading(false);
                    setShowSkeleton(false)
                }, 1000);
            } catch (error) {
                console.error("Error fetching images: ", error);
                setLoading(false); // Handle error by setting loading to false
            }
        };
        fetchImages();
    }, []);

    const handleSearch = (searchTerm: string) => {
        setLoading(true);
        setSearchTerm(searchTerm);

        // Filter images based on tags
        const filtered = images.filter((image) =>
            image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setLoading(false)
        setFilteredImages(filtered);
        if (filtered.length === 0) {
            setNoImages(true);
        } else {
            setNoImages(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        setFilteredImages([]);
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    // Define DND handlers for reordering images
    const moveImage = (fromIndex: number, toIndex: number) => {
        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImages(updatedImages);
    };

    const handleDragStart = () => {
        // Check if the user is logged in before allowing drag and drop
        if (!isLoggedIn) {
            setShowLoginPopup(true); // Show the login popup
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        handleSearch(newSearchTerm);
    };

    if (loading) {
        return (
            <Box
                position={"relative"}
                top={"280px"}
            >
                <LoadingSpinner />
            </Box>
        );
    }

    const backend = window.innerWidth < 768 ? TouchBackend : HTML5Backend;

    return (
        <DndProvider backend={backend}>
            <Navbar onSearch={handleSearch} onClearSearch={clearSearch} onToggleSearchBar={toggleSearchBar} />
            <Flex
                flexDirection="column"
                height="100vh"
                justify={"center"}
                overflow="hidden"
                w="100vw"
                alignItems="center"
                justifyContent="center"
            >
                <Flex>
                    {showSearchBar && (
                        <InputGroup
                            // position="absolute"
                            top="88px"
                            px={"7vw"}
                            display={["flex", "flex", "none"]}
                        >
                            <Input
                                value={searchTerm}
                                w={["90vw"]}
                                placeholder={"Search by tags..."}
                                h={"36px"}
                                color={"#000000"}
                                fontSize={"16px"}
                                fontWeight={400}
                                bg={"#FFFFFF"}
                                border={"2px solid #D1D5DB"}
                                borderRadius={"6px"}
                                _placeholder={{
                                    color: "#000000",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                }}
                                onChange={handleInputChange}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(searchTerm);
                                    }
                                }}
                            />
                        </InputGroup>
                    )}

                </Flex>
                <Box
                    flex="1"
                    overflowY="auto"
                >
                    <Flex
                        // px={["7.5vw", "7vw", "auto", "auto", "50px", "100px"]}
                        pt={"150px"}
                        display="grid"
                        gap="30px"
                        gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "2fr 2fr 0fr", "2fr 2fr 2fr 0fr", "repeat(4, 1fr)", "repeat(5, 1fr)"]}
                    >
                        {searchTerm && noImages ? (
                            <Box
                                position={"absolute"}
                                top={["200px", "180px"]}
                                left={["28vw", "35vw", "40vw", "45vw", "43vw", "48vw"]}
                            >
                                <NoImage />
                            </Box>
                        ) : (
                            (searchTerm ? filteredImages : images).map(
                                (image: ImageData, index: number) => (
                                    <Flex
                                        flexDirection={"column"}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {imageLoading ? (
                                                <Skeleton
                                                    isLoaded={!imageLoading} // Check if the image is loaded
                                                    startColor="#D1D5DB" // Color for the skeleton loader
                                                    endColor="#292929"
                                                    borderRadius="md"
                                                >
                                                    <Image
                                                        src="../../assets/background.jpg"
                                                        maxW="full"
                                                        h={["200px", "250px", "300px", "390px"]}
                                                        w={["150px", "200px", "240px", "230px", "280px", "250px"]}
                                                        objectFit="cover"
                                                        alt="background"
                                                    />
                                                </Skeleton>) : (
                                                <DNDImage
                                                    key={image.id}
                                                    index={index}
                                                    image={image}
                                                    moveImage={moveImage}
                                                    onDragStart={handleDragStart}
                                                    isLoggedIn={isLoggedIn}
                                                />
                                            )}
                                        </motion.div>
                                        <Box
                                            display={"flex"}
                                            flexDir={"row"}
                                            w={["150px", "250px"]}
                                        >
                                            {image.tags.map((tag) => (
                                                <Flex
                                                    key={tag}
                                                    border={"0.5px dashed #EEEEEE"}
                                                    fontSize={["7px", "10px"]}
                                                    fontWeight={[800, 500]}
                                                    color={"#FFFFFF"}
                                                    fontFamily={"Poppins"}
                                                    borderRadius={"10px"}
                                                    px={"5px"}
                                                    py={"6px"}
                                                    mr={"5px"}
                                                    mt={"12px"}
                                                    cursor={"pointer"}
                                                    _hover={{ color: "#000000", background: "#EFEFEF", transition: "0.3s ease-in-out" }}
                                                    onClick={() => { handleSearch(tag); setSearchTerm(tag) }}
                                                >
                                                    {tag}
                                                </Flex>
                                            ))}
                                        </Box>
                                    </Flex>
                                )
                            )
                        )}
                    </Flex>
                </Box>
            </Flex>
            {showLoginPopup && !isLoggedIn && (
                <LoginPopup
                    onLogin={() => {
                        setIsLoggedIn(true);
                        setShowLoginPopup(false);
                    }}
                    onClose={() => setShowLoginPopup(false)}
                />
            )}
        </DndProvider>
    );
};

// Define the props interface for the DNDImage component
interface DNDImageProps {
    index: number;
    image: ImageData;
    moveImage: (fromIndex: number, toIndex: number) => void;
    onDragStart: () => void;
    isLoggedIn: boolean;
}

const DNDImage: React.FC<DNDImageProps> = ({
    index,
    image,
    moveImage,
    onDragStart,
    isLoggedIn,
}) => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [, ref] = useDrag({
        type: "IMAGE",
        item: { index },
    });

    const [, drop] = useDrop({
        accept: "IMAGE",
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                moveImage(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const handleDragStart = () => {
        onDragStart(); // Call the onDragStart prop

        // Check if the user is logged in before allowing drag and drop
        if (!isLoggedIn) {
            setShowLoginPopup(true); // Show the login popup if not logged in
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        onDragStart(); // Call the onDragStart prop

        // Check if the user is logged in before allowing drag(touch) and drop
        if (!isLoggedIn) {
            setShowLoginPopup(true); // Show the login popup if not logged in
        }

        setIsDragging(true);

        // Store the image index in a custom attribute
        e.currentTarget.setAttribute("data-image-index", String(index));
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) {
            e.preventDefault();
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={(node) => ref(drop(node))}
        >
            <Image
                w={["150px", "200px", "240px", "230px", "280px", "250px"]}
                h={["200px", "250px", "300px", "390px"]}
                src={image.url}
                alt={image.tags[0]}
            />
        </div>
    );
};

export default Home;
