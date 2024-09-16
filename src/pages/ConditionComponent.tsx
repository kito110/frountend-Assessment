import React from "react";

interface ConditionProps {
    conditionValue: string; 
    listId?: React.Key;
}

const Condition: React.FC<ConditionProps> = ({ conditionValue, listId, children }) => {
    // Render children only if the condition is met
    return conditionValue ? <div>{listId && children}</div> : null;
};

export default Condition;
