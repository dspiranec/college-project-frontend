import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: User[];
  editUser: User;
  roleUsers: User[];
  roleAdmins: User[];
  currentUserId: number;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    //this.getUsers();
    this.getRoleUsers();
    this.getRoleAdmins();
    this.currentUserId = +sessionStorage.getItem('currentUserId');
  }
/*
  getCurrentUser(): void{
    this.userService.getCurrentUser()
    .subscribe(
      user => this.currentUser = user
    );
  }
*/
  isCurrentUser(userId: number){
    if(this.currentUserId === userId){
      return true;
    }
    return false;
  }

  getRoleUsers(): void{
    this.userService.getRoleUsers()
    .subscribe(users => this.roleUsers = users);
  }

  getRoleAdmins(): void{
    this.userService.getRoleAdmins()
    .subscribe(admins => this.roleAdmins = admins);
  }

  grantAdmin(user: User): void{
    if(confirm("Are you sure you want to grant admin to - "+user.name)) {
      this.userService.grantAdmin(user)
        .subscribe(_ =>{
          this.roleAdmins.push(user),
          this.roleUsers = this.roleUsers.filter(users => users.id !== user.id)
          //this.getRoleUsers(),
          //this.getRoleAdmins()
        });
    }
  }

  revokeAdmin(user: User): void{
    if(confirm("Are you sure you want to revoke admin from - "+user.name)) {
      this.userService.revokeAdmin(user)
        .subscribe(_ =>{
          this.roleUsers.push(user),
          this.roleAdmins = this.roleAdmins.filter(admins => admins.id !== user.id)
          //this.getRoleUsers(),
          //this.getRoleAdmins()
        });
    }
  }
/*
  getUsers(): void{
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
*/

  delete(user: User): void{
    if(confirm("Are you sure you want to delete user - "+user.id)) {
      this.userService.deleteUser(user.id);
      this.roleUsers = this.roleUsers.filter(users => users.id !== user.id);
    }
    
  }

  edit(user){
   this.editUser = user;
  }

  update(){
    if(this.editUser){
      this.userService.updateUser(this.editUser).subscribe(user => {
        const index = user ? this.users.findIndex(m => m.id === user.id) : -1
        if(index > -1 ){
          this.users[index] = user
        }
      });
      this.editUser = undefined;
    }
  }
}
