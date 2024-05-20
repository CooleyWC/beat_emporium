import App from "./components/App";
import Home from './components/pages/Home';
import ErrorPage from "./components/pages/ErrorPage";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import Instruments from "./components/pages/Instruments";
import Signup from "./components/forms/Signup";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/instruments',
                element: <Instruments />,
            }
        ],
    },
]

export default routes;