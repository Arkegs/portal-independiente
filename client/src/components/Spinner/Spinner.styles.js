import styled from 'styled-components';

export const Spinner = styled.div`
    width: 60px;
    height: 60px;
    border: 5px solid black;
    border-bottom: 5px solid gray;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
`