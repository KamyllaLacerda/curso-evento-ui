import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService{

  constructor() { }
  check(){
    let cookie = document.cookie.match(new RegExp('(^| )localUser=([^;]+)'));
    if(cookie){
      return true;
    }else{
      return false;
    }
  }

  async getCookie() {
    const cookie = document.cookie.match(new RegExp('(^| )localUser=([^;]+)'));
    // if(cookie != null){
      const clearCookie = decodeURI(cookie[0]).replace('localUser=', '');
      const auxCookie = decodeURIComponent(clearCookie);
      localStorage.setItem('auth', JSON.stringify(JSON.parse(auxCookie)));
      return await JSON.parse(auxCookie);
    // }
  }
}
