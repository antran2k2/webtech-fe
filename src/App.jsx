import axios from 'axios';
import './App.scss';

import Login from './views/Login/Login.jsx';

import { useEffect, useState, useContext } from 'react';
import ToastMessage from './components/ToastMessage/ToastMessage';
import { ToastMessageContext } from './context/ToastMessageContext.jsx';

function App() {
    const [status, setStatus] = useState('login');

    const handleLogin = (newStatus) => {
        setStatus(newStatus);
    };

    const context = useContext(ToastMessageContext);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            axios
                .get('http://localhost:8080', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                })
                .then((data) => {
                    if (data.data === 1) {
                        setStatus('student');
                    } else if (data.data === 2) {
                        setStatus('teacher');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="App">
            {status === 'login' && <Login handleLogin={handleLogin} />}
            {/* {status === 'student' && <Student />}
            {status === 'teacher' && <Teacher />} */}
            {context.isToastMessage && <ToastMessage />}
        </div>
    );
}

export default App;
