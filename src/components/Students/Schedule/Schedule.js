import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import InforClass from '../InforClass/InforClass';
import axios from 'axios';
import { formatTime } from '../../../utils/functionCusom/functionCusom.js';

function Schedule() {
    // Các chỉ mục trang web (1: thời khóa biểu, 2: popup, 3: chi tiết 1 lớp)
    const [menu, setMenu] = useState(1);
    // Danh sách các lớp học trong 1 ngày (Hiện trong popup)
    const [listClass, setListClass] = useState([]);
    // Ngày đang lựa chọn
    const [daySelect, setDaySelect] = useState(0);

    // Class đang lựa chọn: truyền vào inforClass
    const [classSelect, setClassSelect] = useState({});

    // Thông tin về ngày hôm nay (ngày tháng nằm) => kiểm tra xem nếu thông tin đang hiển thị là ngày hôm nay sẽ active
    const todayDay = new Date().getDate();
    const todayMonth = new Date().getMonth() + 1;
    const todayYear = new Date().getFullYear();

    // Tổng số ngày của tháng đang hiển thị, mặc định là tháng hiện tại
    const [totalDay, setTotalDay] = useState(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Tháng được đếm từ 0 đến 11, cần cộng 1 để lấy tháng hiện tại
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return lastDayOfMonth;
    });

    // Tháng đang hiển thị, mặc định là tháng hiện tại
    const [month, setMonth] = useState(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        return currentMonth;
    });

    // Năm đang hiển thị, mặc định là năm hiện tại
    const [year, setYear] = useState(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        return currentYear;
    });

    //Danh sách ngày và thứ của tháng đang hiển thị, mặc định là tháng hiện tại
    const [monthDays, setMonthDays] = useState(getMonthDays(year, month - 1));

    //Danh sách các ô trong bảng (số ô = số hàng x 7)
    const [listNode, setListNode] = useState(() =>
        createListInt(totalDay, monthDays[0].weekday, getTotalRowTable(totalDay, monthDays[0].weekday)),
    );

    useEffect(() => {
        //Khi tháng hoặc năm thay đổi
        // Số ngày của tháng hiện tại
        let dayOfToday = new Date(year, month, 0).getDate();
        // Danh sách ngày và thứ của tháng đang hiển thị
        let MDay = getMonthDays(year, month - 1);

        // Cập nhật số ngày của tháng hiện tại
        setTotalDay(dayOfToday);

        //cập nhật lại danh sách ngày và thứ của tháng đang hiển thị
        setMonthDays(MDay);

        //cập nhật lại danh sách các ô trong bảng
        setListNode(createListInt(dayOfToday, MDay[0].weekday, getTotalRowTable(dayOfToday, MDay[0].weekday)));
    }, [month, year]);

    // hàm lấy danh sách ngày và thứ của ngày đó trong 1 tháng,
    function getMonthDays(year, month) {
        const date = new Date(year, month, 1);
        const days = [];

        // Lấy ngày đầu tiên của tháng
        while (date.getMonth() === month) {
            const day = date.getDate();
            const weekday = date.getDay() + 1; // 1 (Chủ Nhật) - 7 (Thứ Bảy)

            // Thêm ngày và thứ vào mảng
            days.push({ day, weekday });

            // Di chuyển đến ngày tiếp theo
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    // Hàm tính số hàng trong bảng (tổng số ngày trong tháng, thứ bắt đầu)
    function getTotalRowTable(totalDay, dayStart) {
        return Math.floor((totalDay - (8 - dayStart)) / 7) + 2;
    }

    //Hàm tạo danh sách các phần tử trong lịch(Tổng số ngày trong tháng, thứ bắt đầu trong tháng, số cột)
    function createListInt(number, start, colum) {
        start = start - 1;
        const length = colum * 7;
        const result = [];

        for (let i = 0; i < length; i++) {
            if (i >= start && i < start + number) {
                result.push(i - start + 1);
            } else {
                result.push(0);
            }
        }

        return result;
    }

    //cập nhật lại tháng và năm
    const handleChangeMonth = (currentMonth, number) => {
        if (currentMonth === 1 && number === -1) {
            setMonth(12);
            setYear(year - 1);
        } else if (currentMonth === 12 && number === 1) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(currentMonth + number);
        }
    };

    // Thay đổi chỉ mục trang web value (1: thời khóa biểu, 2: popup, 3: chi tiết 1 lớp), day: thứ của ngày đó, item ngày lựa chọn
    const handleChangeMenu = (value, day, item) => {
        setMenu(value);
        handleGetInfoClassOnDay(day);
        setDaySelect(item);
    };

    // Thay đổi thông tin popup: hiển thị đúng thông tin các môn học trong ngày hôm đó
    const handleGetInfoClassOnDay = (day) => {
        try {
            const token = localStorage.getItem('token');
            axios
                .get(`http://localhost:8080/student/class-on-day?day=${day}`, {
                    headers: { Authorization: 'Token ' + token },
                })
                .then((response) => {
                    setListClass(response.data.data);
                });
        } catch (error) {}
    };

    const handleInforClass = (classOnDay) => {
        setClassSelect(classOnDay);
    };

    return (
        <>
            {(menu === 1 || menu === 2) && (
                <div className="calendar">
                    <div className="calendar-header">
                        <div
                            className="prev-month"
                            onClick={() => {
                                handleChangeMonth(month, -1);
                            }}
                        >
                            Tháng trước
                        </div>
                        <p className="month-year">
                            Tháng {month} năm {year}
                        </p>
                        <div
                            className="next-month"
                            onClick={() => {
                                handleChangeMonth(month, 1);
                            }}
                        >
                            Tháng sau
                        </div>
                    </div>
                    <div className="days">
                        <div className="thead">
                            <div className="tr">
                                <div className="th">Chủ Nhật</div>
                                <div className="th">Thứ Hai</div>
                                <div className="th">Thứ Ba</div>
                                <div className="th">Thứ Tư</div>
                                <div className="th">Thứ Năm</div>
                                <div className="th">Thứ Sáu</div>
                                <div className="th">Thứ Bảy</div>
                            </div>
                        </div>
                        <div className="day-items">
                            {listNode.map((item, index) => (
                                <div className="day-item-outline" key={index}>
                                    <div
                                        className={`${item === 0 ? 'day-item' : 'day-item-active'} ${
                                            item === todayDay && month === todayMonth && year === todayYear
                                                ? 'active-current-day-item'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            if (!item) return;
                                            handleChangeMenu(2, (index % 7) + 1, item);
                                        }}
                                    >
                                        {item === 0 ? '' : item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {menu === 2 && (
                        <div className="background-popup">
                            <div className="popup">
                                <div className="btn-close" onClick={() => handleChangeMenu(1, 0, 0)}>
                                    <AiOutlineClose />
                                </div>
                                <div className="day">
                                    Ngày {daySelect} tháng {month}
                                </div>
                                <div className="items">
                                    {listClass.length === 0 ? (
                                        <div className="item">
                                            <div className="subject">Không có lớp học trong ngày</div>
                                        </div>
                                    ) : (
                                        listClass.map((classOnDay, index) => (
                                            <div
                                                className="item"
                                                onClick={() => {
                                                    handleChangeMenu(3, 0, 0);
                                                    handleInforClass(classOnDay);
                                                }}
                                                key={index}
                                            >
                                                <div className="time">
                                                    <div className="time-start">{formatTime(classOnDay.startTime)}</div>
                                                    <div className="time-end">{formatTime(classOnDay.endTime)}</div>
                                                </div>
                                                <div className="subject">{classOnDay.termName}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {menu === 3 && <InforClass classSelect={classSelect} />}
        </>
    );
}

export default Schedule;
