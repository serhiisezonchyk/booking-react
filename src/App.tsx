import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout, RequiredAuthLayout } from './components/layout/Layout';
import { chatPageloader, listPageloader, profilePageloader, singlePageloader } from './lib/loaders';
import ChatPage from './pages/chat-page/ChatPage';
import HomePage from './pages/home-page/HomePage';
import ListPage from './pages/list-page/ListPage';
import LoginPage from './pages/login/LoginPage';
import NewPostPage from './pages/new-post-page/NewPostPage';
import ProfileUpdatePage from './pages/profile-update-page/ProfileUpdatePage';
import ProfilePage from './pages/profile/ProfilePage';
import Register from './pages/register/Register';
import SinglePage from './pages/single-page/SinglePage';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/list',
          element: <ListPage />,
          loader: listPageloader,
        },
        {
          path: '/:id',
          element: <SinglePage />,
          loader: singlePageloader,
        },

        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/',
      element: <RequiredAuthLayout />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
          loader: profilePageloader,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdatePage />,
        },
        {
          path: '/chat',
          element: <ChatPage />,
          loader: chatPageloader,
        },
        {
          path: '/add',
          element: <NewPostPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
