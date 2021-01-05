import React from 'react'
const { detect } = require('detect-browser');
const browser = detect();
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';

export function useAuth(){
      const [cookies, setCookie] = useCookies([])
      
      if(!cookies.memclid && !cookies.memclem) {
            // setCookie('memclid', 'Eliezer', {path: '/'})
            // setCookie('memclem', '1234', {path: '/'})
            // getCookie('memclid', true);
            // getCookie('memclem', true);
            // localStorage.setItem('suscriberId', 'Eliezer')
            // localStorage.setItem('suscriberEmail', '1234')
            // const suscriberId = localStorage.getItem('suscriberId');
            // const suscriberEmail = localStorage.getItem('suscriberEmail');
    
            // if(suscriberId){
    
            // // getInfoTv();
            // // addUserInformation();
            // // return true;
            //  return [suscriberId, suscriberEmail]
            // }
      }

      if(!cookies.platform) setCookie('platform', 'Web Browser', {path: '/'}) 
      if(!cookies.deviceType) setCookie('deviceType', browser.name, {path: '/'})
      if(!cookies.deviceVersion) setCookie('deviceVersion', browser.version, {path: '/'})
      if(!cookies.uuid) setCookie('uuid', uuidv4(), {path: '/'})
      if(!cookies.userAgent) setCookie('userAgent', window.navigator.userAgent, {path: '/'})
      
      return cookies
        
}