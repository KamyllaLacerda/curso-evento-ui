import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { LocalUser } from '../model/local_user';
import { CookieService } from './cookie.service';

@Injectable()
export class StorageService{

  constructor(private cookieService: CookieService) { }

  getLocalUser(): LocalUser{
    let usr = localStorage.getItem(STORAGE_KEYS.localUser)
    if(usr == null){
      return null;
    }else{
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser){
    if(obj == null){
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }else{
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getUserByAuth() {
    let user = JSON.parse(localStorage.getItem('auth'));
    if(!user){
      this.cookieService.getCookie().then(result=>{
        user = result;
      });
    }
    return user.username;
  }

}
