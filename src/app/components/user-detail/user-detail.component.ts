import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
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
  arrUsuarios: IUser[] = []; //

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  @Output() userDeleted = new EventEmitter<number>();  // Emitir el ID del usuario eliminado


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id'); // Verifica si el parámetro es 'id'
    if (id) {
      this.userId = id;
      this.getUserDetails(id);
    }
  }

  getUserDetails(id: string) {
    this.userService.getUserById(id).subscribe((user: IUser) => {
      this.user = user;
    });
  }

  async deleteUser() {
    if (this.userId) {
      console.log('Intentando eliminar el usuario con ID:', this.userId);

      // Mostrar SweetAlert para confirmar la eliminación
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        try {
          // Llamada al servicio para eliminar el usuario
          await firstValueFrom(this.userService.deleteUser(String(this.userId)));

          console.log('Usuario eliminado con éxito');

          // Filtrar la lista de usuarios eliminando el usuario correspondiente
          this.arrUsuarios = this.arrUsuarios.filter(user => user.id !== Number(this.userId));

          // Limpiar los datos del usuario en el frontend
          this.user = undefined;

          // Redirigir a la página de inicio después de la eliminación
          this.router.navigate(['/home']);

          // Mostrar mensaje de éxito
          Swal.fire(
            'Eliminado',
            'El usuario ha sido eliminado correctamente',
            'success'
          );
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          Swal.fire(
            'Error',
            'No se pudo eliminar el usuario',
            'error'
          );
        }
      }
    } else {
      console.log('No se encontró un ID de usuario válido para eliminar.');
    }
  }
}

  
