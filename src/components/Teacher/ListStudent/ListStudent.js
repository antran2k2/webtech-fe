import './ListStudent.scss';

function ListStudent({ listStudent, loading }) {
    return (
        <>
            <div className="list-student-of-one-class">
                <div className="title">Danh sách lớp ({listStudent.length})</div>
                <div className="list-items">
                    {listStudent.map((student, index) => (
                        <div className="item" key={index}>
                            <div className="avatar">
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1686664868~exp=1686665468~hmac=721710ec1c27ef11520d692e4440b06e5cec315ecb720b177f6f12a0fccce193" />
                            </div>
                            <div className="info">
                                <div className="name">{student.userName}</div>
                                <div className="code">{student.userCode}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ListStudent;
