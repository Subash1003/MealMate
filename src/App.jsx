import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Restaurant from './pages/Restaurant/Restaurant.jsx';
import RestaurantMenu from './pages/RestaurantMenu/RestaurantMenu.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Contact from './pages/Contact/Contact.jsx';

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
        path:"/Restaurant",
        element:<Restaurant/>
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
