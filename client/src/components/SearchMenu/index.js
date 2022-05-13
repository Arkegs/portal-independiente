import { React, useState } from 'react';

// Import styles
import { Wrapper, Content } from './SearchMenu.styles';

const SearchMenu = ({setQuery}) =>{
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilter = (value) =>{
        (searchTerm !== '' && searchTerm !== '?wordFilter=')
        ? setQuery(searchTerm + '&sortingType=' + value)
        : setQuery(`?sortingType=${value}`);
    }

    const handleSearchTerm = () =>{
        (searchTerm !== '' && searchTerm !== '?wordFilter=')
        ? setQuery(searchTerm)
        : setQuery('');
    }

    return(
        <Wrapper>
            <Content>
                <input 
                    onChange={(e) => setSearchTerm(`?wordFilter=${e.target.value}`)}
                    placeholder="Filtrar trabajos" 
                    type="text"
                />
                <button
                    type="submit"
                    onClick={(e) => handleSearchTerm()}
                >
                    Filtrar    
                </button>
            </Content>
            <Content>
                <div className="selectFilter" onChange={(e) => handleFilter(e.target.value)}>
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