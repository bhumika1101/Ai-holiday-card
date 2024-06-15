import React from "react";
import ErrorPage from "../ErrorPage";
import './SystemShutdownPage.scss'
import Button from "../HomePage/Button";

const SystemShutdownPage = () => {
    return (
        <div>
            <ErrorPage errorMsg1={"The AI Holiday Greeting card will be temporarily offline for scheduled maintenance."} 
                buttonLabel="Retry Later"
                startImageSrc="./content/images/error-graphics.svg"
            />
        </div>
    );
}

export default SystemShutdownPage;