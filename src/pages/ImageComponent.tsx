import React from "react";
import styled from "styled-components";

interface ImageOptions {
    src: string;
    alt: string;
}

const ImageComponent: React.FC<ImageOptions> = (options) => {
    const { src, alt } = options;
    return <ImageContainer src={src} alt={alt} />;
};

export default ImageComponent;

const ImageContainer = styled.img`
    height: 200px;
    width: 80%;
    border-radius: 35px;
    margin-left: 10%;
    margin-top: 3%;
    border: 2px solid #b4bbc3;
    background: #6262f4;
`;
