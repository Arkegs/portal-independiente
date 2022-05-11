import React from 'react';

import { Wrapper, Content } from './Topbar.styles';

const Topbar = () => {
    return(
        <Wrapper>
            <Content>
                <div>
                    Logo   
                </div> 
                <div>
                    Hamburguesa
                </div>
            </Content>
        </Wrapper>
    );
};

export default Topbar;