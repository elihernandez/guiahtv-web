import React from "react";
import TransitionApp from '../Transitions/index'
const axios = require('axios');

  // axios.get('/getMac')
  //   .then(function (response) {
  //     // handle success
  //     // console.log(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });

export default function FormLogin({state, onClickButtonBack }) {
    
     const onSubmitForm = (evt) => {
      axios.post('/login', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 

    return (
        // <TransitionApp state={state}>
            <div className="form-login">
                <div className="content-info">
                    <img className="image-logo" src="/src/assets/images/logos/guiahtv/guiahtv-logo-purple.png"></img>
                </div>
                <div className="content-info">
                    <h2>Login</h2>
                </div>
                <div className="content-info">
                    <button onClick={onClickButtonBack}>Volver</button>
                    <button onClick={onSubmitForm}>Iniciar sesión</button>
                </div>
            </div>
        // </TransitionApp>
    );
}
