import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from '../contexts/ContextProvider'

function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  
  const {setNotification} = useStateContext();

  const navigate = useNavigate();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong.");
        });
    }, []);
  }

  const onSubmit = e=>{
    e.preventDefault();
    if(user.id){
        axiosClient.put(`/users/${user.id}`, user).then(({data})=>{
            navigate('/users');
            setNotification('User was successfully updated')
        }).catch(err=>{
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors)
            }
        })
    }else{
        axiosClient.post(`/users`, user).then(({data})=>{
            navigate('/users');
            setNotification('User was successfully created')
        }).catch(err=>{
            const response = err.response
            if(response && response.status === 422){
                setErrors(response.data.errors)
            }
        })

    }
  }
  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading &&
            <form onSubmit={onSubmit}>
                <input value={user.name} onChange={e=>setUser({...user, name: e.target.value})} placeholder="Name" type='text' />
                <input value={user.email} onChange={e=>setUser({...user, email: e.target.value})} placeholder="Email" type='email' />
                <input placeholder="Password" onChange={e=>setUser({...user, password: e.target.value})} type='password' />
                <input placeholder="Password Confirmation" onChange={e=>setUser({...user, password_confirmation: e.target.value})} type='password' />
                <button className="btn">Save</button>
            </form>
        }
      </div>
    </>
  );
}

export default UserForm;
