// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, Toaster } from 'react-hot-toast';
// import { Edit, Trash2 } from 'lucide-react';
// import {
//   Button,
//   Datepicker,
//   Label,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Textarea,
//   TextInput,
// } from 'flowbite-react';

// const Home = ({ list, error }) => {
//   const [openModal, setOpenModal] = useState(false);

//   const deleteItem = async (itemId) => {
//     try {
//       const response = await axios.delete(`/api/todo/${itemId}`);
//       console.log('Deleted:', response.data);
//       window.location.reload();
//       toast.success('Successfully Deleted!');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error', error);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-UK', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };
//   return (
//     <div className='max-w-full bg-[#1F2937] h-[calc(100vh-68px)] flex flex-col gap-3 items-center'>
//       {error ? <p className='text-red-500'>{error}</p> : <div></div>}
//       {list?.map((lists) => {
//         return (
//           <div
//             key={lists._id}
//             className='flex items-center gap-10 max-w-[80vw] w-full p-2  bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
//           >
//             <div className='flex items-center ps-4 rounded-sm dark:border-gray-700'>
//               <input
//                 id='bordered-checkbox-1'
//                 type='checkbox'
//                 value=''
//                 name='bordered-checkbox'
//                 className='w-5 h-5 flex-1 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
//               />
//             </div>
//             <div className='flex-7'>
//               <h5 className='mb-1 text-xl font-medium tracking-tight text-gray-900 dark:text-white'>
//                 {lists.title}
//               </h5>
//               <p className='font-normal text-gray-700 dark:text-gray-400'>
//                 {lists.description}
//               </p>
//               <p className='font-normal text-gray-700 dark:text-gray-400'>
//                 {formatDate(lists.date)}
//               </p>
//             </div>
//             <div className='flex-1 flex gap-5'>
//               <Trash2
//                 className='text-red-500 cursor-pointer'
//                 onClick={() => deleteItem(lists._id)}
//               />
//               <Toaster position='top-right' reverseOrder={false} />
//               <Edit
//                 className='text-green-500 cursor-pointer'
//                 onClick={() => setOpenModal(true)}
//               />
//               <Modal
//                 show={openModal}
//                 size='md'
//                 className='flex justify-center'
//                 popup
//                 onClose={() => setOpenModal(false)}
//               >
//                 <ModalHeader />
//                 <ModalBody>
//                   <div className='space-y-6 p-5'>
//                     <h3 className='text-xl font-medium text-center text-gray-900 dark:text-white'>
//                       Update
//                     </h3>
//                     <div>
//                       <div className='mb-2 block'>
//                         <Label htmlFor='title'>Title</Label>
//                       </div>
//                       <TextInput id='title' placeholder='Todo Title' required />
//                     </div>
//                     <div>
//                       <div className='mb-2 block'>
//                         <Label htmlFor='description'>Description</Label>
//                       </div>
//                       <Textarea id='description' required />
//                     </div>
//                     <div>
//                       <div className='mb-2 block'>
//                         <Label htmlFor='date'>Date</Label>
//                       </div>
//                       <input
//                         type='date'
//                         id='date'
//                         className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
//                       />
//                     </div>
//                     <div className='w-full'>
//                       <Button className='p-2 bg-green-400 px-3 cursor-pointer'>
//                         Update
//                       </Button>
//                     </div>
//                   </div>
//                 </ModalBody>
//               </Modal>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Edit, Trash2 } from 'lucide-react';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput,
} from 'flowbite-react';

const Home = ({ list, error }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description,
      date: todo.date.split('T')[0] 
    });
    setOpenModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todo/${selectedTodo._id}`,
        formData
      );
      console.log('Updated:', response.data);
      toast.success('Successfully Updated!');
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating todo');
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${itemId}`);
      console.log('Deleted');
      window.location.reload();
      toast.success('Successfully Deleted!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error deleting item');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='max-w-full bg-[#1F2937] h-[calc(100vh-68px)] flex flex-col gap-3 items-center'>
      <Toaster position='top-right' reverseOrder={false} />
      {error ? <p className='text-red-500'>{error}</p> : <div></div>}
      
      {list?.map((lists) => {
        return (
          <div
            key={lists._id}
            className='flex items-center gap-10 max-w-[80vw] w-full p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <div className='flex items-center ps-4 rounded-sm dark:border-gray-700'>
              <input
                id='bordered-checkbox-1'
                type='checkbox'
                value=''
                name='bordered-checkbox'
                className='w-5 h-5 flex-1 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </div>
            <div className='flex-7'>
              <h5 className='mb-1 text-xl font-medium tracking-tight text-gray-900 dark:text-white'>
                {lists.title}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                {lists.description}
              </p>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                {formatDate(lists.date)}
              </p>
            </div>
            <div className='flex-1 flex gap-5'>
              <Trash2
                className='text-red-500 cursor-pointer'
                onClick={() => deleteItem(lists._id)}
              />
              <Edit
                className='text-green-500 cursor-pointer'
                onClick={() => handleEditClick(lists)}
              />
            </div>
          </div>
        );
      })}

      {/* Update Modal */}
      <Modal
        show={openModal}
        size='md'
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          <form onSubmit={updateTodo} className='space-y-6 p-5'>
            <h3 className='text-xl font-medium text-center text-gray-900 dark:text-white'>
              Update Todo
            </h3>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='title'>Title</Label>
              </div>
              <TextInput
                id='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Todo Title'
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='description'>Description</Label>
              </div>
              <Textarea
                id='description'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='date'>Date</Label>
              </div>
              <input
                type='date'
                id='date'
                value={formData.date}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                required
              />
            </div>
            <div className='w-full'>
              <Button type='submit' className='w-full py-3 cursor-pointer bg-green-400'>
                Update
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Home;