import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
const [email, setEmail] = useState();
const [password, setPassword] = useState("");
const Navigate = useNavigate();
const {store, actions} = useContext(Context);

const handleLogin = (e) => {
    e.preventDefault();
    actions.login(email, password);
};
// if (store.token && store.token !== "" && store.token !== undefined ) {
//     Navigate("/private")
// }
return (
    <div className="container pt-3">
        {(store.token && store.token !== "" && store.token !== undefined ) ? 
        "You're loged in with this token" + store.token 
    :
    <div className="Card mx-auto" style={{width: "25rem"}}>
        <h3 className="text-center">Login</h3>
        <input 
        type="email" 
        value={email} 
        className="form-control" 
        onChange={e => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        value={password} 
        className="form-control" 
        onChange={e => setPassword(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    }
    </div>
)
}