import { useState } from 'react';
import axios from 'axios';
import './Login.scss';

function Login({ handleLogin }) {
    // selectedRole: 1 học sinh, 2 giáo viên, 3 admin
    const [selectedRole, setSelectedRole] = useState(null);
    const [userCode, setUserCode] = useState('');
    const [password, setPassword] = useState('');

    const loginClickLogin = async () => {
        axios
            .post('http://localhost:8080/user', {
                userCode: userCode,
                password: password,
                userType: selectedRole,
            })
            .then((response) => {
                if (response.status === 200) {
                    if (selectedRole === 1) {
                        localStorage.setItem('token', response.data.data);
                        handleLogin('student');
                    } else if (selectedRole === 2) {
                        localStorage.setItem('token', response.data.data);
                        handleLogin('teacher');
                    } else {
                        alert('Tài khoản, mật khẩu không chính xác!');
                    }
                } else {
                    alert('Tài khoản, mật khẩu không chính xác!');
                }
            })
            .catch(function (error) {
                alert('Đã xảy ra lỗi trong quá trình đăng nhập!');
                console.log(error);
            });
    };

    return (
        <>
            <div className="background"></div>
            <div className="form-login">
                <div className="title">Đăng nhập</div>
                <div className="text-popup-login">Đăng nhập bằng tài khoản mssv/msgv</div>
                <div className="input">
                    <input
                        placeholder="Tài khoản đăng nhập"
                        value={userCode}
                        onChange={(e) => {
                            setUserCode(e.target.value);
                        }}
                    />
                    <input
                        placeholder="Mật khẩu đăng nhập"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="role">
                    <div className="input-checkbox">
                        <input type="checkbox" checked={selectedRole === 1} onChange={() => setSelectedRole(1)} />
                        <span>Tôi là học sinh</span>
                    </div>
                    <div className="input-checkbox">
                        <input type="checkbox" checked={selectedRole === 2} onChange={() => setSelectedRole(2)} />
                        <span>Tôi là giáo viên</span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        loginClickLogin();
                    }}
                >
                    Đăng nhập
                </button>
                <div className="suport">
                    Chưa có tài khoản, đăng ký <span>tại đây</span>.
                </div>
            </div>
        </>
    );
}

export default Login;
