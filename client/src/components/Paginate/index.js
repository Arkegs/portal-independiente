import React from 'react';
import axios from 'axios';

// Import styles
import { Wrapper, PageButton } from './Paginate.styles';

const Paginate = ({lastPage, currentPage, setState, setError, setLoading, query}) => {
    const changePage = (newPage) => {
        try{
            setLoading(true);
            axios.get(`api/jobs${query}&pageNum=${newPage}`)
            .then(resp => {
                console.log(`CAMBIO DE PAGINA! api/jobs${query}&pageNum=${newPage}`);
                console.log(resp.data.payload.results);
                setState({results:resp.data.payload.results});
            })
            .catch(err => {
                setError(true);
            });
        } catch(err){
            setError(true);
        }
        setLoading(false);
        setError(false);
    }

    return(
        <Wrapper>
            {(currentPage > 1) && <>
                <PageButton onClick={() => changePage(currentPage-1)}>{"<"}</PageButton>
                <PageButton onClick={() => changePage(currentPage-1)}>1</PageButton>
            </>}
            {(currentPage >= 4) && <span>...</span>}
            {(currentPage > 2) && <PageButton onClick={() => changePage(currentPage-1)}>{currentPage - 1}</PageButton>}
            <PageButton style={{backgroundColor: 'gray'}}>{currentPage}</PageButton>
            {(currentPage < lastPage - 1) && <PageButton onClick={() => changePage(currentPage+1)}>{currentPage + 1}</PageButton>}
            {(currentPage < lastPage - 4) && <span>...</span>}
            {(currentPage < lastPage) && <>
                <PageButton onClick={() => changePage(lastPage)}>{lastPage}</PageButton>
                <PageButton onClick={() => changePage(currentPage+1)}>{">"}</PageButton>
            </>}
        </Wrapper>
    );
}

export default Paginate;