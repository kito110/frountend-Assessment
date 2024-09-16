import React from "react";
import styled from "styled-components";

// Define the types for image options
interface ImageOptions {
    src: string;
    alt: string;
}

// Define the props for the ImageComponent
interface ImageComponentProps {
    options: ImageOptions;
}

// Functional component to display an image
const ImageComponent: React.FC<ImageComponentProps> = ({ options }) => (
    <ImageContainer src={options.src} alt={options.alt} />
);

export default ImageComponent;

// Styled component for the image
const ImageContainer = styled.img`
    height: 200px;
    width: 80%;
    border-radius: 35px;
    margin-left: 10%;
    margin-top: 3%;
    border: 2px solid #b4bbc3;
    background: #6262f4;
`;
