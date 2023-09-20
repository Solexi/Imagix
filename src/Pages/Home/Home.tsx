import React, { useEffect, useState } from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { imageData } from "../../static";
import LoadingSpinner from "../../components/LoadingSpinner";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoginPopup from "../../components/LoginPopup/index";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { motion } from "framer-motion";
import NoImage from "../../components/NoImage";

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
                    setImages(imageData);
                    setLoading(false); // Set loading to false when data is fetched
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

    return (
        <DndProvider backend={HTML5Backend}>
            <Flex
                dir="column"
                height="100vh"
                overflow="hidden"
                // w={"100%"}
            >
                <Navbar onSearch={handleSearch} onClearSearch={clearSearch} />
                <Box
                    flex="1"
                    overflowY="auto"
                >
                    <Box
                        mx={"100px"}
                        position={"absolute"}
                        top={"150px"}
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(5, 1fr)"
                    >
                        {searchTerm && noImages ? (
                            <Box
                                position={"absolute"}
                                top={"180px"}
                                left={"520px"}
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
                                    <DNDImage
                                        key={image.id}
                                        index={index}
                                        image={image}
                                        moveImage={moveImage}
                                        onDragStart={handleDragStart}
                                        isLoggedIn={isLoggedIn}
                                    />
                                </motion.div>
                                <Box 
                                    display={"flex"}
                                    flexDir={"row"}
                                >
                                    {image.tags.map((tag) => (
                                        <Flex
                                            key={tag}
                                            border={"0.5px dashed #EEEEEE"}
                                            fontSize={"10px"}
                                            fontWeight={500}
                                            color={"#FFFFFF"}
                                            fontFamily={"Poppins"}
                                            borderRadius={"10px"}
                                            px={"5px"}
                                            py={"6px"}
                                            mr={"5px"}
                                            mt={"12px"}
                                            cursor={"pointer"}
                                            _hover={{color: "#000000", background: "#EFEFEF"}}
                                            onClick={() => {handleSearch(tag); setSearchTerm(tag)}}
                                        >
                                            {tag}
                                        </Flex>
                                    ))}
                                </Box>
                                </Flex>
                            )
                        )
                        )}
                    </Box>
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

    return (
        <div onDragStart={handleDragStart} ref={(node) => ref(drop(node))}>
            <Image w="250px" h="390px" src={image.url} alt={image.tags[0]} />
        </div>
    );
};

export default Home;
