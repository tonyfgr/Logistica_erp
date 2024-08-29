import { useState, useEffect, useRef } from "react"

import useAxiosPrivate from "../hooks/useAxiosPrivate"

import { useNavigate, useLocation } from "react-router-dom"

const Provincias = () => {
    const effectRun = useRef(false)

    const [ provincias, setProvincias] = useState()

    var axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getProvincias = async () => {
            try {
                const response = await axiosPrivate.get('api/mantenimientos/provincias/', {
                    signal: controller.signal
                })

                console.log(response.data)
                isMounted && setProvincias(response.data)

            } catch (err) {
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true})
            }
        }

        if (effectRun.current) {
            getProvincias()
        }

        return () => {
            isMounted = false
            controller.abort()
            effectRun.current = true
        }
    }, [])

    return (
        <article>
            <h2>Lista de provincias</h2>
            {
                provincias?.length ? (
                    <ul>
                        {provincias.map((provincia, i) => <li key={i}>{provincia?.nombreprovincia}</li>)}
                    </ul>
                ) : <p>No se encuentra ninguna provincia</p>
            }
        </article>
    )
}

export default Provincias