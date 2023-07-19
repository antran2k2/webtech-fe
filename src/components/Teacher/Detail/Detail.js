import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClassInformation from '../ClassInformation/ClassInformation';
import AttendanceInformation from '../AttendanceInformation/AttendanceInformation';
import Notification from '../../Students/Notification/Notification';
import Nav from '../../Nav/Nav';
import Statistical from '../Statistical/Statistical';

function Detail({ classObj }) {
    const listTo = [
        {
            to: '/',
            text: 'Thông tin lớp học',
        },
        {
            to: '/attendance-information',
            text: 'Thông tin điểm danh',
        },
        {
            to: '/statistical',
            text: 'Thống kê lớp',
        },
        {
            to: '/notification',
            text: 'Thông báo',
        },
    ];

    return (
        <>
            <Router>
                <Nav listTo={listTo} />
                <div className="body">
                    <Routes>
                        <Route path="/" element={<ClassInformation classObj={classObj} />} />
                        <Route path="/attendance-information" element={<AttendanceInformation classObj={classObj} />} />
                        <Route path="/statistical" element={<Statistical classObj={classObj} />} />
                        <Route path="/notification" element={<Notification classObj={classObj} teacher={true} />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default Detail;
