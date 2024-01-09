import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [isValid, setIsValid] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const checkToken = async () => {
            try {
                let response = await fetch(process.env.BACKEND_URL + "/api/private",
                    { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } })
                if (response.status == 200){
                    setIsValid(true)
                }
                else {
                    isValid(false)
                }

            }
            catch (error) {
                console.log(error)
            }
        }
        checkToken()
    }, []);
    switch (isValid){
        case true: 
        return (
            <div>Private</div>
        )
        case false:
        return("You don't have access")
    }
    
}