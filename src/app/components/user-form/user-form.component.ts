import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core'; // Asegúrate de importar el 'inject' desde '@angular/core'
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userForm: FormGroup;
  isEditMode: boolean = false;
  userId: string | null = null;

  constructor() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('_id');
    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          image: user.image
        });
        console.log('Datos cargados para la edición:', user);
      });
    }
  }

  submit() {
    if (this.userForm.valid) {
      const user: IUser = this.userForm.value;
      console.log('Formulario enviado:', user);

      if (this.isEditMode) {
       // console.log('Modo edición - Actualizando usuario');
        this.userService.updateUser(this.userId!, user).subscribe(() => {
          // Mostrar una alerta de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            text: 'Los datos del usuario han sido actualizados correctamente.',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        });
      } else {
        console.log('Modo creación - Creando nuevo usuario');
        this.userService.createUser(user).subscribe(() => {
          // Mostrar una alerta de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El nuevo usuario ha sido creado correctamente.',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        });
      }
    } else {
     // console.log('Formulario no válido');
      // Mostrar una alerta de error si el formulario no es válido
      Swal.fire({
        icon: 'error',
        title: 'Formulario no válido',
        text: 'Por favor, asegúrate de que todos los campos estén correctamente completados.',
      });
    }
  }
    }
  
