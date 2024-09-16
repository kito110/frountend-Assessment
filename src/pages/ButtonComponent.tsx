import React from "react";
import styled from "styled-components";

import { ReactComponent as IconHide } from "../icons/hide.svg";
import { ReactComponent as IconShow } from "../icons/show.svg";
import { ReactComponent as IconLocation } from "../icons/location.svg";

// Mapping button conditions to icons
const ButtonIconMap: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
    Hide: IconHide,
    Show: IconShow,
    location: IconLocation,
};

interface ButtonProps {
    text: string;
    onClick: () => void;
    variable: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variable }) => {
    // Get the required icons based on the variable or text
    const getButtonIcon = (condition: string, height: string, width: string) => {
        const ButtonComponent = ButtonIconMap[condition];
        if (!ButtonComponent) return null;
        return <ButtonComponent width={width} height={height} />;
    };

    return (
        <StyledButton onClick={onClick}>
            <Text>{text}</Text>
            <IconWrapper>
                {
                    // Show the icon based on the variable or text
                    getButtonIcon(variable === "location" ? variable : text, "40", "40")
                }
            </IconWrapper>
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button`
    height: 200px;
    width: 80%;
    border-radius: 35px;
    margin-left: 10%;
    margin-top: 3%;
    border: 2px solid #b4bbc3;
    background: #6262f4;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center; 
    justify-content: center;
`

const Text = styled.h4`
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 20px;
    color: white;
    font-weight: 100;
    font-family: "Roboto", sans-serif;
    margin: 0;
`;

const IconWrapper = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
`;
