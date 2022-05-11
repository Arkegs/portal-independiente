import React from 'react';

import { Wrapper, Content } from './Sidebar.styles';

const Sidebar = () => {
    return(
        <Wrapper>
            <Content>
                <div>
                    Logo   
                </div> 
                <div>
                    Hamburguesa
                </div>
                <div>
                    Otra opcion
                </div>
            </Content>
        </Wrapper>
    );
};

export default Sidebar;