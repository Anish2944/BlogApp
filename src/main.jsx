import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//Fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);
//pages
import MyPost from './pages/MyPost.jsx'
import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

import {Protected, Login} from './components/index.js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path:'/login',
        element: (
          <Protected authentication={false} >
            <Login/>
          </Protected>
        ),
      },
      {
        path:'/signup',
        element: (
          <Protected authentication={false} >
            <Signup/>
          </Protected>
        ),
      },
      {
        path:'/all-posts',
        element: (
          <Protected authentication >
            {" "}
            <AllPost/>
          </Protected>
        ),
      },
      {
        path:'/my-posts',
        element: (
          <Protected authentication >
            {" "}
            <MyPost/>
          </Protected>
        ),
      },
      {
        path:'/add-posts',
        element: (
          <Protected authentication >
            <AddPost/>
          </Protected>
        ),
      },
      {
        path:'/post/:slug/edit-post/:slug',
        element: (
          <Protected authentication >
            <EditPost />
          </Protected>
        ),
      },
      {
        path:'/post/:slug',
        element: <Post/>,
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
