import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import Components
import Spinner from '../Spinner';
import Paginate from '../Paginate';
import SearchBar from '../SearchBar';
import JobCard from '../JobCard';

// Import styles
import { Wrapper, Content } from './JobList.styles';

const JobList = () => {
    const [state, setState] = useState({results:{docs:[]}});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(()=> {
        try{
            setLoading(true);
            axios.get('api/jobs')
            .then(resp => {
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
    },[]);

    return(
        <Wrapper>
            <SearchBar setQuery={setQuery}/>
            <Content>
                {state.results.docs.map(item => <JobCard key={item._id} job={item} />)}
                {error && <div>Algo falló. Intentelo nuevamente.</div>}
            </Content>
            {loading && <Spinner />}
            <Paginate 
                lastPage={state.results.totalPages} 
                currentPage={state.results.page} 
                setState={setState}
                setError={setError}
                setLoading={setLoading}
                query={query}
            />
        </Wrapper>
    );
};

export default JobList;