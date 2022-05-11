import React from 'react';
import { Link } from 'react-router-dom';

// Import styles
import { Wrapper, Content, JobImg } from './JobCard.styles';

const JobCard = ({ job }) =>{
    return(
        <Wrapper>
            <Link to={`/${job._id}`}>
                <Content>
                        <JobImg />
                        <h2>{job.title}</h2>
                        <p>Autor: {job.author && job.author.name}</p>
                        <p>{job.description}</p>
                </Content>
            </Link>
        </Wrapper>
    );
};

export default JobCard;