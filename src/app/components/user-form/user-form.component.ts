import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  user: IUser = {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: ''
  };
  message = '';

  userService= inject(UserService)
  createUser() {
    this.userService.createUser(this.user).subscribe(
      response => {
        this.message = 'Usuario creado con éxito';
        console.log(response);
      },
      error => {
        this.message = 'Error al crear el usuario';
        console.error(error);
      }
    );
  }

  

}
