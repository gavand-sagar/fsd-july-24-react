import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/utils'
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ component }) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsVisible(true);
        } else {
            navigate('/login')
        }
    }, [])

    return (
        isVisible ? component : <></>
    )
}
