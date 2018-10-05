import React from 'react';
import Waiting from './components/Waiting';

const translate = () => {
    return 'On arrive!'
}

const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state

    if (isLoading) {
        return <Waiting
            translate={translate}
        />;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

export default LoadingComponent;