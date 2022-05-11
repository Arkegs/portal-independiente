import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logculiao, setLogculiao] = useState('A ver?');

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(email);
        axios.post('/api/login', {'email': email, 'password': password}, { withCredentials: true })
            .then(response => {
                console.log("Successful login!");
                console.log(response);
            }).catch(err => {
                console.log("Something went wrong in the login");
                console.log(err);
            })
    }

    const handleLog = event => {
        axios.get('/api/logged', { withCredentials: true })
            .then(response => {
                console.log(response)
                setLogculiao(response.data);
            }).catch(err => {
                console.log(err)
                setLogculiao("Algo cago");
            });
    }

    const sessionCheck = event => {
        axios.get('/api/sessionCheck', { withCredentials: true })
            .then(response => {
                console.log(response)
                setLogculiao(response.data);
            }).catch(err => {
                console.log(err)
                setLogculiao("Algo cago");
            });
    }

    return(
        <>
        <form>
            <input type="text" name="email" value={email} onChange={event => setEmail(event.currentTarget.value)}></input>
            <input type="text" name="password" value={password} onChange={event => setPassword(event.currentTarget.value)}></input>
            <button type="" onClick={event => handleSubmit(event)}>Submit</button>
        </form>
        <button onClick={e => handleLog(e)}>Loged?</button>
        <p>{logculiao}</p>
        <button onClick={e => sessionCheck(e)}>Cachemos la sesion</button>
        </>
    )
}

export default SignIn;