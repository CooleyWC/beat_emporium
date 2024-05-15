import App from "./components/App";
import Home from './components/pages/Home';
import ErrorPage from "./components/pages/ErrorPage";
import Login from "./components/forms/Login";

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
        ],
    },
]

export default routes;