import React from 'react';

// Import styles
import { Wrapper, Content } from './SearchBar.styles';

const SearchBar = () =>{
    return(
        <Wrapper>
            <Content>
                Busque sus weas
            </Content>
            <Content>
                <div>Test</div>
                <div>Test 2</div>
            </Content>
        </Wrapper>
    )
}

export default SearchBar;