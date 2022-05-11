import styled from 'styled-components';

export const Wrapper = styled.div`
    min-width: 45%;
    -webkit-box-shadow: 0px 5px 10px 5px rgba(0,0,0,0.31); 
    box-shadow: 0px 5px 10px 5px rgba(0,0,0,0.31);
    margin: 20px;
    flex-grow: 1;
    max-width: 45%;
    padding: 25px;
    animation: animateJobCards 1s;

    @keyframes animateJobCards{
        from{
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @media screen and (max-width: 768px){
        width: 100%;
        max-width: 100%;
    } 
`;

export const Content = styled.div`
    width: 100%;

`

export const JobImg = styled.div`
    width: 100%;
    height: 100px;
    background: rgba(34,193,195,1);
`