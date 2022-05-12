import React from 'react';

// Import styles
import { Wrapper, Content } from './SearchMenu.styles';

const SearchMenu = ({setQuery}) =>{
    return(
        <Wrapper>
            <Content>
                <input 
                    placeholder="Filtrar trabajos" 
                    type="text"
                />
            </Content>
            <Content>
                <div className="selectFilter" onChange={(e) => setQuery(`?sortingType=${e.target.value}`)}>
                    <div className="radioFilter">
                        <label>
                            <input type="radio" value="nofilter" name="filter" selected/> Sin filtro
                        </label>
                    </div>
                    <div className="radioFilter">
                        <label>
                            <input type="radio" value="price" name="filter" /> Más baratos
                        </label>
                    </div>
                    <div className="radioFilter">
                        <label>
                            <input type="radio" value="createdAt" name="filter" /> Más recientes
                        </label>
                    </div>
                    <div className="radioFilter">
                        <label>
                            <input type="radio" value="review" name="filter" /> Más populares
                        </label>
                    </div>
                </div>
            </Content>
        </Wrapper>
    )
}

export default SearchMenu;