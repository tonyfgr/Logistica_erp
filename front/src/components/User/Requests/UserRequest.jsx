import { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom';

const UserRequest = () => {
    const effectRun = useRef(false)
    const [ user, setUser] = useState()

    var axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    //Getting user data
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getUsuario = async () => {
            try {
                const response = await axiosPrivate.get('api/user', {
                    signal: controller.signal
                })

                isMounted && setUser(response.data)

            } catch (err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true})
            }
        }

        if (effectRun.current) {
            getUsuario()
        }

        return () => {
            isMounted = false
            controller.abort()
            effectRun.current = true
        }
    }, [])

    return user
}

export default UserRequest
