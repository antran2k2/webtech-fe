import useFetch from '../../../hooks/useFetch';
import './ClassList.scss';
import { formatTime } from '../../../utils/functionCusom/functionCusom.js';

function ClassList({ handleSetOptions }) {
    const { listData: listclass, loading } = useFetch('http://localhost:8080/teacher/all-class');

    return (
        <>
            <div className="class-list">
                <div className="title">Các lớp học trong kỳ:</div>
                <div className="class-items">
                    {loading === 2 &&
                        listclass.map((classObj, index) => (
                            <div
                                className="item"
                                key={index}
                                onClick={() => {
                                    handleSetOptions('detail', classObj);
                                }}
                            >
                                <div className="subject-name">
                                    {classObj.classCode} - {classObj.termName} - {classObj.termCode}
                                </div>
                                <div className="learning-day">Thứ {classObj.day}</div>
                                <div className="learning-time">
                                    Thời gian: {formatTime(classObj.startTime)} - {formatTime(classObj.endTime)}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default ClassList;
