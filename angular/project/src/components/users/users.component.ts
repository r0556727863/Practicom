import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService, User } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  showAdd = false;
  showEdit = false;
  selectedUser: User | null = null;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      passWord: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    console.log('טוען משתמשים...');
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('משתמשים שנשלפו:', this.users);
      },
      error: (err) => console.error('שגיאה בטעינת משתמשים:', err)
    });
  }

  toggleAdd() {
    this.showAdd = !this.showAdd;
    this.showEdit = false;
    this.userForm.reset();
    this.selectedUser = null;
  }

  toggleEdit(user: User) {
    this.showEdit = true;
    this.showAdd = false;
    this.selectedUser = user;
    this.userForm.setValue({
      userName: user.userName,
      email: user.email,
      phone: user.phone || '',
      passWord: ''
    });
  }

  submit() {
    if (this.userForm.invalid) return;

    const value = this.userForm.value;

    if (this.showAdd) {
      console.log('מוסיף משתמש:', value);
      this.usersService.addUser(value).subscribe({
        next: (user) => {
          this.users.push(user);
          console.log('משתמש נוסף:', user);
          this.toggleAdd();
        },
        error: (err) => console.error('שגיאה בהוספת משתמש:', err)
      });
    } else if (this.showEdit && this.selectedUser) {
      const updatedUser: User = { ...this.selectedUser, ...value };
      console.log('מעדכן משתמש:', updatedUser);
      this.usersService.updateUser(updatedUser).subscribe({
        next: (user) => {
          const index = this.users.findIndex(u => u.userId === user.userId);
          this.users[index] = user;
          console.log('משתמש עודכן:', user);
          this.showEdit = false;
          this.selectedUser = null;
        },
        error: (err) => console.error('שגיאה בעדכון משתמש:', err)
      });
    }
  }

  deleteUser(user: User) {
    if (confirm(`למחוק את ${user.userName}?`)) {
      console.log('מוחק משתמש:', user);
      this.usersService.deleteUser(user.userId).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.userId !== user.userId);
          console.log('משתמש נמחק');
        },
        error: (err) => console.error('שגיאה במחיקת משתמש:', err)
      });
    }
  }
}
