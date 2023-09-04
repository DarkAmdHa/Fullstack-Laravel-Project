import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const {token} = useStateContext()

    if(token){
        return <Navigate to='/' />
    }
  return (
    <div>
    <div className="login-signup-form">
      <div className="form">
      <Outlet />
      </div>
        </div>
    </div>
  )
}
