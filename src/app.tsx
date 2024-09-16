import React from 'react';
import { useParams } from 'react-router';

const App = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>Render {id}</div>
    );
};

export default App;
