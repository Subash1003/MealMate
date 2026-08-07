import Navbar from './components/navbar/Navbar.jsx';
import {Outlet,BrowserRouter,createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import About from './pages/about/About.jsx';
import RestaurantMenu from './components/body/RestaurantMenu.jsx';
import Cart from './pages/Cart.jsx';
import Contact from './pages/contact/Contact.jsx'
let route = createBrowserRouter([
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/About",
        element:<About/>
      },
      {
        path:"/Restaurant/:id",
        element:<RestaurantMenu/>
      },
      {
        path:"/Contact",
        element:<Contact/>
      },
      {
        path:"/Cart",
        element:<Cart/>
      }
])
function App(){

    return(
        <div   style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        overflowX: "hidden"
      }}>
        <RouterProvider router={route}></RouterProvider>
        </div>
    );

}
export default App;