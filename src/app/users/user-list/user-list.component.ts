import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],

})
export class UserListComponent implements OnInit {

  constructor(public service: UserService,
    public toastr: ToastrService
    ) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(u: User){
    this.service.formData = Object.assign({}, u);
  }

  onDelete(Id){
    if(confirm('Are you sure to delete this record ?')){
    this.service.deleteUser(Id)
    .subscribe(
      res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'User Register');
      },
      err => {
        console.log(err);
      });
    }
  }

  changeActive(u: User){
    if(u.Active == false)
      u.Active = true;
    else
      u.Active = false;
      
      this.saveActive(u);
    }
  
  saveActive(u: User){
    this.service.formData = u;
    this.service.putUser().subscribe(
      res => {
        this.toastr.info('Submitted successfully', 'User Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  totalCountOfActive(){
    let total = 0;
    for(var s in this.service.list){
      total++;
    }
    return total;
  }

  countActiveIsTrue(u: User){
      if(u.Active == true){
        ++this.service.count;
      }
  }

 sumActive(){
   return this.service.count;
 }

 modalClick(){
  this.service.count = 0;
 }
}
