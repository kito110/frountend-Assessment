import React from "react";
import { useParams } from "react-router";
import Page from "./pages/page";

type PageId = "page-one" | "page-two" | "page-three";

const App = () => {
    const { id } = useParams<{ id: string }>();

    const isValidPageId = (id: any): id is PageId => {
        return ["page-one", "page-two", "page-three"].includes(id);
    };

    return <Page pageId={isValidPageId(id) ? id : "page-one"} />;
};

export default App;
