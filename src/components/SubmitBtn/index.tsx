import { Button} from "@chakra-ui/react";
import React from "react";
import { FC } from "react";

interface SubmitBtnProps {
    btntitle: string;
    isLoading?: any;
    onClick?: any;
    loadingText?: any;
    rest?: any;

}
const SubmitBtn: FC<SubmitBtnProps> = ({
    btntitle,
    isLoading,
    onClick,
    loadingText,
    rest,
}) => {
    const { btnBox } = useStyles();

    return (
        <Button {...btnBox}
            as='button'
            w={"100%"}
            isLoading={isLoading}
            onClick={onClick}
            {...rest}
            type="submit"
            loadingText={loadingText}
            _hover={{ bg: "#062B6F", color: "#FFFFFF" }}
        >
            {btntitle}
        </Button>
    );
};

export default SubmitBtn;

const useStyles = () => {
    return {
        btnBox: {
            background: "#0A0606",
            fontWeight: 800,
            fontFamily: 'Poppins',
            fontSize: "14px",
            textAlign: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "0",
            padding: "20px 40px 20px 40px",
            marginTop: "28px",
            border: "0px solid #E2E8F0",
        },
    };
};