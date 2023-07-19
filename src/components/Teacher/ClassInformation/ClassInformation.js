import ListStudent from '../ListStudent/ListStudent';
import './ClassInformation.scss';
import { formatTime } from '../../../utils/functionCusom/functionCusom.js';
import useFetch from '../../../hooks/useFetch';
import PopUpCreateAttendanceCode from './PopUpCreateAttendanceCode';
import { useState } from 'react';
import PopUpCreateQuiz from './PopUpCreateQuiz';

function ClassInformation({ classObj }) {
    // Hiển thị các popup (0: không hiển thị, 1: popup thêm mới điển danh, 2: thêm mới bài quiz))
    const [isPopUp, setIsPopUp] = useState(0);

    const { listData: listStudent, loading } = useFetch(
        `http://localhost:8080/teacher/class/all-student?classCode=${classObj.classCode}`,
    );

    const handlePopUp = (value) => {
        setIsPopUp(value);
    };

    return (
        <>
            {classObj && (
                <>
                    <div className="inforname-teacher">
                        <div className="left">
                            <div className="item">Tên môn học: {classObj.termName}</div>
                            <div className="item">Mã lớp: {classObj.classCode}</div>
                            <div className="item">Mã học phần: {classObj.termCode}</div>
                            <div className="item">Sỹ số: {listStudent.length} học sinh</div>
                            <div className="item">
                                Thời gian: {formatTime(classObj.startTime)} - {formatTime(classObj.endTime)}
                            </div>
                        </div>
                        <div className="right">
                            <div className="outline-btn">
                                <div className="btn active" onClick={() => handlePopUp(1)}>
                                    Tạo mã điểm danh
                                </div>
                                <div className="btn active" onClick={() => handlePopUp(2)}>
                                    Tạo bài tập
                                </div>
                            </div>
                        </div>
                    </div>
                    <ListStudent listStudent={listStudent} loading={loading} />
                    {isPopUp === 1 && <PopUpCreateAttendanceCode handlePopUp={handlePopUp} classObj={classObj} />}
                    {isPopUp === 2 && <PopUpCreateQuiz handlePopUp={handlePopUp} classObj={classObj} />}
                </>
            )}
        </>
    );
}

export default ClassInformation;
