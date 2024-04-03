import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import ListPage from './pages/list-page/ListPage';
import Layout from './components/layout/Layout';
import SinglePage from './pages/single-page/SinglePage';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children:[
        {
          path:'/',
          element:<HomePage/>,
        },
        {
          path:'/list',
          element:<ListPage/>,
        },
        {
          path:'/:id',
          element:<SinglePage/>,
        },
      ]
    },
    
  ]);
  return <RouterProvider router={router} />;
}

export default App;
