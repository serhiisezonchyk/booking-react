import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ChatPage from './pages/chat-page/ChatPage';
import HomePage from './pages/home-page/HomePage';
import ListPage from './pages/list-page/ListPage';
import ProfilePage from './pages/profile/ProfilePage';
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
        },
        {
          path: '/:id',
          element: <SinglePage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
