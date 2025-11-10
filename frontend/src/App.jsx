import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Navbar from './components/Navbar'
import axios from 'axios'

const App = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://todo-w1hq.onrender.com')
        console.log(response.data)
        setList(response.data)
      } catch (error) {
        console.error(error);
        setError(error)
      }
    }
    fetchData();
  }, [location.pathname])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home list={list} error={error} />} />
        <Route path='/create' element={<Create setList={setList} />} />
      </Routes>
    </div>
  )
}

export default App
