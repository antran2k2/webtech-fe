import useFetch from '../../../hooks/useFetch';

function LearnOutComes({ formatTime }) {
    const { listData: listClass, loading } = useFetch('http://localhost:8080/student/subjects-student');

    console.log(listClass);

    return (
        <>
            <div className="learn-outcomes">
                <div className="title">Thời khóa biểu của bạn</div>
                <div className="days">
                    <div className="thead">
                        <div className="tr">
                            <div className="th">STT</div>
                            <div className="th">Học phần</div>
                            <div className="th">Mã học phần</div>
                            <div className="th">Lớp học</div>
                            <div className="th">Lịch học</div>
                            <div className="th">Vắng</div>
                            <div className="th">Giáo viên</div>
                        </div>
                    </div>
                    <div className="tbody">
                        {loading === 2 &&
                            listClass.map((classObj, index) => (
                                <div className="tr" key={index}>
                                    <div className="td">{index + 1}</div>
                                    <div className="td">{classObj.termCode}</div>
                                    <div className="td">{classObj.termName}</div>
                                    <div className="td">TC-101</div>
                                    <div className="td">
                                        thứ {classObj.day} - {formatTime(classObj.startTime)} -{' '}
                                        {formatTime(classObj.endTime)}
                                    </div>
                                    <div className="td">{classObj.countAttendanceFalse}</div>
                                    <div className="td">{classObj.teacherName}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearnOutComes;
