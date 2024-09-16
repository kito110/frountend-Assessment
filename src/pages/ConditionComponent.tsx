import React from "react";

interface ConditionProps {
    conditionValue: string;
    listId?: React.Key;
    children?: React.ReactNode;
}

const Condition: React.FC<ConditionProps> = ({ conditionValue, listId, children }) => {
    return conditionValue ? <div>{listId !== undefined ? children : null}</div> : null;
};

export default Condition;
