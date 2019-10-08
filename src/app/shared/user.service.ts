import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  readonly rootURL = 'http://localhost:53069/api';
  list: User[];
  count = 0;

  constructor(public http: HttpClient) { }

  postUser(){
    return this.http.post(this.rootURL + '/Users', this.formData)
  }

  putUser(){
    return this.http.put(this.rootURL + '/Users/' + this.formData.Id, this.formData)
  }

  deleteUser(id){
    return this.http.delete(this.rootURL + '/Users/' + id)
  }
  
  refreshList(){
    this.http.get(this.rootURL + '/Users')
    .toPromise()
    .then(res => this.list = res as User[])
    .then(res => this.count = 0);
  }
}
