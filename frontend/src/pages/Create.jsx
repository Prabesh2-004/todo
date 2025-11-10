import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = ({ setList }) => {
  const [userInput, setUserInput] = useState({
    title: '',
    description: '',
    date: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todo-w1hq.onrender.com/create', userInput);
      setList(prevList => [...prevList, response.data]);
      console.log(response.data);
      navigate('/')
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className='bg-[#1F2937] h-[calc(100vh-68px)] flex items-center'>
      <form className='max-w-md w-full mx-auto' onSubmit={handleSubmit}>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='mb-5'>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Title
          </label>
          <input
            type='text'
            name='title'
            value={userInput.title}
            onChange={handleChange}
            id='title'
            className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
            placeholder='To Do Title'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={userInput.description}
            onChange={handleChange}
            className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='date'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Date
          </label>
          <input
            type='date'
            id='date'
            name='date'
            value={userInput.date}
            onChange={handleChange}
            className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
            required
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Create ToDo
        </button>
      </form>
    </div>
  );
};

export default Create;
