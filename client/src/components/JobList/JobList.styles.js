import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 60px;
    margin-left: 200px;
    padding: 20px;
    width: calc(100% - 200px);
    min-height: calc(100vh - 60px);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
`;
