import { useEffect } from "react"
import { useState } from "react"
import axiosClient from '../axios-client'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getUsers();
  }, [])

  const getUsers = () =>{
    setLoading(true)
    axiosClient.get('/users').then(({data})=>{
      setUsers(data)
      console.log(data)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
    })
  }

  return (
    <div>
      Users
    </div>
  )
}
