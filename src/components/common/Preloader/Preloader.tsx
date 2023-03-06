import React from 'react';
import preloader from "../../../assets/img/preloader.svg";

const Preloader:React.FC = () => {
    return (
        <div>
            <img src={preloader}/>
        </div>
    );
};

export default Preloader;