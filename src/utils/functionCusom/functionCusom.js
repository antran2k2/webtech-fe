// Format thời gian hh:mm:ss -> hh:mm
const formatTime = (time) => {
    const parts = time.split(':');
    if (parts.length === 3) {
        const formattedTime = `${parts[0]}:${parts[1]}`;
        return formattedTime;
    }
    return time; // Trả về thời gian không đúng định dạng nếu không phải "hh:mm:ss"
};

// Format thời gian 2023-05-28T02:59:18.000Z -> 2023-05-28
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

// Hàm lấy ra tuần học hiện tại (lessionNumber)
const checkLession = () => {
    // Ngày bắt đầu cho lớp học
    const startDate = new Date('2/26/2023');

    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Tính toán số ngày giữa ngày hiện tại và ngày bắt đầu
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return daysDifference;
};

// hàm lấy thông tin định vị
const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position.coords);
                },
                (error) => {
                    reject(error);
                },
            );
        } else {
            reject(new Error('Geolocation is not supported by your browser.'));
        }
    });
};

// Hàm kiểm tra định vị
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Bán kính Trái Đất (đơn vị mét)
    const radian1 = (lat1 * Math.PI) / 180; // Đổi độ sang radian
    const radian2 = (lat2 * Math.PI) / 180; // Đổi độ sang radian
    const dentaPhi = ((lat2 - lat1) * Math.PI) / 180; // Kết quả chênh lệch vĩ độ theo radian
    const dentaLambda = ((lon2 - lon1) * Math.PI) / 180; // Kết quả chênh lệch kinh độ theo radian

    // Tính toán khoảng cách chênh lệch vĩ độ theo công thức haversine
    const a =
        Math.sin(dentaPhi / 2) * Math.sin(dentaPhi / 2) +
        Math.cos(radian1) * Math.cos(radian2) * Math.sin(dentaLambda / 2) * Math.sin(dentaLambda / 2);

    // khảng cách giữa 2 điểm theo công thức haversine
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Khoảng cách giữa hai điểm (đơn vị mét)

    return distance;
};

// Kiểm tra xem có nằm trong bán kính 100m không
const isWithin100m = (latitude1, longitude1, latitude2, longitude2) => {
    const distance = calculateDistance(latitude1, longitude1, latitude2, longitude2);
    return distance <= 100;
};

// Hàm kiểm tra khoảng cách thời gian hợp lệ (thời gian, khoảng cách phút) => trả về true,false
const checkTime = (time, distance) => {
    const date1 = new Date(time);
    const date2 = new Date();
    const check = Math.abs(date1.getTime() - date2.getTime());
    return check < distance * 60 * 1000;
};

module.exports = {
    formatTime,
    formatDate,
    checkLession,
    getLocation,
    isWithin100m,
    checkTime,
};
