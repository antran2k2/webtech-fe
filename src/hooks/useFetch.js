import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [listData, setlistData] = useState([]);
    // 1 loading, 2 success, 3 error
    const [loading, setloading] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
            .get(url, {
                headers: { Authorization: 'Token ' + token },
            })
            .then((data) => {
                return data.data;
            })
            .then((data) => {
                let newList = data;

                return newList;
            })
            .then((newList) => {
                setlistData(newList);
                setloading(2);
            })
            .catch((err) => {
                console.log(err);
                setloading(3);
            });
    }, [url]);
    return { listData, loading };
};

export default useFetch;
