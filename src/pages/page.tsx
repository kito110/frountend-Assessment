import React, { useEffect, useState } from "react";
import Button from "./ButtonComponent";
import Weather from "./WeatherComponent";
import Condition from "./ConditionComponent";
import Image from "./ImageComponent";
import axios from "axios";

type PageData = {
    variables: Variable[];
    components: ComponentData[];
    lists: List[];
};

type ComponentType = "button" | "weather" | "condition" | "image";

interface Variable {
    name: string;
    initialValue: string;
}

interface ComponentOptions {
    text?: string;
    variable?: string;
    value?: string;
    lon?: number;
    lat?: number;
    src?: string;
    alt?: string;
}

interface ComponentData {
    id: number;
    type: ComponentType;
    options: ComponentOptions;
    children?: number;
}

interface List {
    id: number;
    components: number[];
}

interface PageId {
    pageId: string;
}

const componentMap: Record<ComponentType, React.ComponentType<any>> = {
    button: Button,
    weather: Weather,
    condition: Condition,
    image: Image,
};

const Page: React.FC<PageId> = ({ pageId }) => {
    const [pageData, setPageData] = useState<PageData | null>(null);
    const [variables, setVariables] = useState<Record<string | number, any>>({});

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:${process.env.SERVER_PORT ?? 3030}/page/${pageId}`
                );
                const data = response.data.data;
                setPageData(data);

                // Initialize variables state
                if (data?.variables) {
                    const initialVariables = data.variables.reduce(
                        (
                            acc: { [x: string]: any },
                            variable: { name: string | number; initialValue: any }
                        ) => {
                            acc[variable.name] = variable.initialValue;
                            return acc;
                        },
                        {} as Record<string | number, any>
                    );
                    setVariables(initialVariables);
                }
            } catch (err) {
                console.error("Error fetching page data:", err);
            }
        };

        fetchPageData();
    }, [pageId]);

    const handleClick = (variable: string | number, value: any) => {
        setVariables((prev) => ({
            ...prev,
            [variable]: value,
        }));
    };

    const componentMapById: Record<number, ComponentData> = (pageData?.components || []).reduce(
        (acc, component) => {
            acc[component.id] = component;
            return acc;
        },
        {} as Record<number, ComponentData>
    );

    const listMapById: Record<number, List> = (pageData?.lists || []).reduce((acc, list) => {
        acc[list.id] = list;
        return acc;
    }, {} as Record<number, List>);

    const renderComponent = (componentData: ComponentData) => {
        const { type, options } = componentData;
        const Component = componentMap[type];

        if (!Component) {
            return null;
        }

        switch (type) {
            case "image":
                return <Component key={componentData.id} {...options} />;
            case "condition":
                // render all the child components linked
                const conditionValue = variables[options.variable || ""];
                const listId = componentData.children as number;
                if (conditionValue === options.value && listId !== undefined) {
                    const list = listMapById[listId];
                    if (list) {
                        return (
                            <Component
                                key={componentData.id}
                                conditionValue={conditionValue}
                                listId={listId}
                            >
                                {list.components.map((componentId) => {
                                    const childComponentData = componentMapById[componentId];
                                    return childComponentData
                                        ? renderComponent(childComponentData)
                                        : null;
                                })}
                            </Component>
                        );
                    }
                }
                return null;
            case "button":
                return (
                    <Component
                        key={componentData.id}
                        {...options}
                        onClick={() => {
                            if (options.variable !== undefined) {
                                handleClick(options.variable, options.value);
                            }
                        }}
                    />
                );
            case "weather":
                return <Component key={componentData.id} {...options} />;
            default:
                return null;
        }
    };

    if (!pageData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {pageData.lists
                .find((list) => list.id === 0)
                ?.components.map((componentId) => {
                    const componentData = componentMapById[componentId];
                    if (!componentData) return null;
                    // render the actual component based on the data
                    return renderComponent(componentData);
                })}
        </div>
    );
};

export default Page;
