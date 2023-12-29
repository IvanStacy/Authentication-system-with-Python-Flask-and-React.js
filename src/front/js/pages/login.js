import React from "react";

export const Login = () => {


return (
    <div className="container pt-3">
        <div className="Card mx-auto" style={{width: "25rem"}}>
        <h3 className="text-center">Login</h3>
        <input type="email" value={email} className="form-control"></input>
        </div>
    </div>
)
}