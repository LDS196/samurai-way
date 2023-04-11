import React from 'react';
import { Spin} from "antd";

const Preloader: React.FC = () => {
    return (

        <Spin size={"large"}
              style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
              }}/>

    );
};

export default Preloader;