import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, inject, Input, signal } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
 user!: IUser | undefined;
  userId: string = '';

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id'); // Obtiene el ID de la URL
    if (id) {
      try {
        this.user = await firstValueFrom(this.userService.getUserById(id));
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    }
  }

  // Método para eliminar un usuario
  async deleteUser() {
    const confirmed = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
  
    
  

  
  
  
  }
  }




  
