
import Dashboard from "@material-ui/icons/Dashboard";
import AdminTocken from "views/authentication/admin-login.js"
import Login from "views/authentication/login.js"
import Signup from "views/authentication/registration.js"



   const   dashboardRoutes  = [

    {
      path: "/signup",
      name: "Signup",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: Signup,
      layout: "/admin"
    },
    {
      path: "/login",
      name: "Maps",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: Login,
      layout: "/admin-login"
    },

   
   
    {
      path: "/admin-token",
      name: "Login",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: AdminTocken,
      layout: "/key"
    },
    
   
  ]


    export default dashboardRoutes
 



