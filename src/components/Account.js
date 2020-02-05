import React from 'react';
import Login from './Login';
import Register from './Register';
const Account = () => {
   
    return (
      <div className="jumbotron">
         <div className="row justify-content-around">
            <Register/>
            <Login/>
         </div>
      </div>
    );
}
export default Account;