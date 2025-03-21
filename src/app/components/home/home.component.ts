import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interfaces';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsuarios: IUser[] = [];
  apiService = inject(UserService);

  // Cargar usuarios automáticamente al inicializar el componente
 ngOnInit(){

  this.apiService.getAll().subscribe( response =>{
    this.arrUsuarios = response.results;
    //console.log(response.results)

  })
}

deleteUser(id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiService.deleteUser(id).subscribe(() => {
        this.arrUsuarios = this.arrUsuarios.filter(user => user.id !== id);

        // Mostrar mensaje de éxito
        Swal.fire(
          'Eliminado',
          'El usuario ha sido eliminado correctamente',
          'success'
        );
      });
    }
  });
}
}
