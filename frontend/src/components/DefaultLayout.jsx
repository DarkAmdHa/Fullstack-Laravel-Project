import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";


export default function DefaultLayout() {
    const {user,token} = useStateContext()
    if(!token){
        return <Navigate to="/login" />
    }

    const {setUser,setToken} = useStateContext()

    useEffect(()=>{
      axiosClient.get('/user').then(({data})=>{
        setUser(data)
      }).catch(err=>{
        console.log(err);
        const response = err.response;
        if(response && (response.status === 422||response.status===401) )
          setToken(null)
      })
    }, [])
    
    const onLogout = e=>{
      e.preventDefault()
      axiosClient.post('/logout').then(()=>{
        setUser({})
        setToken(null)
      })
    }
  return (
    <div id="defaultLayout">
        <aside>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/users'>Users</Link>
        </aside>
        <div className='content'>
          <header>
            <div>Header</div>
            <div>
              {user.name}
              <a href='#' onClick={onLogout} className="btn-logout">Logout</a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
    </div>
  )
}
