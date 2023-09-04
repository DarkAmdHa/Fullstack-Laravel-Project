import {Link} from 'react-router-dom'
import { useRef,useState } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser, setToken} = useStateContext() 

  const [errors,setErrors] = useState(null)

  const onSubmit = e =>{
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload).then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    }).catch(error=>{
      const response = error.response
      if(response && response.status == 422){
        if(response.data.errors){
          setErrors(response.data.errors)
        }else{
          setErrors({
            generalError: [response.data.message]
          })
        }
      }
    })
  }
  return (
        <form onSubmit={onSubmit} className=' animated fadeInDown'>
          <h1 className="title">Login to your account</h1>
          {errors && 
            <div className='alert'>
              {Object.keys(errors).map(key=>(
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>}
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered ? <Link to='/signup'>Create an account</Link>
          </p>
        </form>

  )
}
