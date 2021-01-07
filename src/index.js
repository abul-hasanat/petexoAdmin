
// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

// // core components
// import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";

// import "assets/css/material-dashboard-react.css?v=1.9.0";

// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/admin" component={Admin} />
//       <Route path="/rtl" component={RTL} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );







import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";
// import Store from "layouts/Store.js";
import Login from "layouts/Login.js";
import AdminLogin from "layouts/AdminLogin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

var userInfo =   JSON.parse(localStorage.getItem("UserData"));

 var tocken =   JSON.parse(localStorage.getItem("token"));

//const userInfo

if(tocken !== null){

  if(userInfo !== null){
    if( userInfo.UserTypeID === 2 ){

      ReactDOM.render(  
        
        
       <Router history={hist}>
          <Switch>   
            <Route path="/admin" component={Admin} />   
            {/* <Route path="/rtl" component={RTL} />    */}
            <Redirect from="/" to="/admin/dashboard" />,
          </Switch>
          
        </Router>,
       
       
        document.getElementById("root")
      );
      
       }
  
  
  }
  
     else{

      ReactDOM.render(  
      
      
        <Router history={hist}>
           <Switch>   
             <Route path="/admin-login" component={AdminLogin} />         
             <Redirect from="/" to="/admin-login/login" />
            </Switch>
           {/* <Route path="/user" component={Login} />        */}
         </Router>,
       
        
         document.getElementById("root")
    
      )
    
    }



    //  else {
       
    // ReactDOM.render(  
      
      
    //   <Router history={hist}>
    //      <Switch>   
    //        <Route path="/store" component={Store} />   
    //        {/* <Route path="/rtl" component={RTL} />    */}
    //        <Redirect from="/" to="/store/dashboard" />
    //      </Switch>
    //    </Router>,
     
      
    //    document.getElementById("root")
    //  );
    //  }

}
else{

  ReactDOM.render(  
  
  
    <Router history={hist}>
       <Switch>   
         <Route path="/key" component={Login} />         
         <Redirect from="/" to="/key/admin-token" />
        </Switch>
       {/* <Route path="/user" component={Login} />        */}
     </Router>,
   
    
     document.getElementById("root")

  )

}

