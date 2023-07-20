import './Student.scss';
import Schedule from '../../components/Students/Schedule/Schedule';
import LearnOutComes from '../../components/Students/LearnOutComes/LearnOutComes';
import Notification from '../../components/Students/Notification/Notification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { checkLession } from '../../utils/functionCusom/functionCusom';

function Student() {
    const lessionNumber = checkLession();

    const listTo = [
        {
            to: '/',
            text: 'Thời khóa biểu',
        },
        {
            to: '/learn-out-comes',
            text: 'Kết quả học tập',
        },
        {
            to: '/notification',
            text: 'Thông báo',
        },
    ];

    // Format thời gian
    const formatTime = (time) => {
        const parts = time.split(':');
        if (parts.length === 3) {
            const formattedTime = `${parts[0]}:${parts[1]}`;
            return formattedTime;
        }
        return time; // Trả về thời gian không đúng định dạng nếu không phải "hh:mm:ss"
    };

    return (
        <>
            <Router>
                <div className="container">
                    <div className="header">
                        <div className="title">
                            <div className="title-logo">
                                <img
                                    src="https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg"
                                    alt="avatar"
                                />
                            </div>
                            <div className="title-info">
                                <div className="title-top">HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN</div>
                                <div className="title-bot">
                                    ĐẠI HỌC BÁCH KHOA HÀ NỘI - TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG
                                </div>
                            </div>
                        </div>
                        <div className="avatar">
                            <img
                                src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/313928031_1857605907938653_6284185701097598776_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZD_ddflYUFUAX9aKNAg&_nc_ht=scontent.fhan2-4.fna&oh=00_AfAF_2xkWbg1xx5ssnZqCLPYrk9_vGWpa2mL8rJ-4KVzEw&oe=64BACEE1"
                                alt="avatar"
                            />
                            <div className="current-time">Tuần học thứ {lessionNumber}: 17/07 - 23/07 </div>
                        </div>
                    </div>
                    <Nav listTo={listTo} />
                    <div className="body">
                        <Routes>
                            <Route path="/" element={<Schedule />} />
                            <Route path="/learn-out-comes" element={<LearnOutComes formatTime={formatTime} />} />
                            <Route path="/notification" element={<Notification />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default Student;
