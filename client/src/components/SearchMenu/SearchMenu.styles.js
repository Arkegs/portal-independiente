import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: var(--lightMainColor);
    border-radius: 10px;
    margin: 20px 0;
`;

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 20px 0;

    input{
        width:100%;
        height: 40px;
        margin: auto;
        border: none;
        border-radius: 10px;
        padding: 20px;
        font-size: var(--fontMed);
        :focus{
            outline: none;
        }
    }

    .selectFilter{
        width: 100%;
        display: flex;
        justify-content: space-around;

        .radioFilter{
            display: flex;
            align-items: center;

            label{
                cursor:pointer;
            }

            input{
                width:20px;
                height:20px;
                margin-right: 10px;
                cursor: pointer;
            }
        }


    }
`;

