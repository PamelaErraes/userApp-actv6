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
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = []; 
  apiService = inject(UserService);

  // Cargar usuarios automáticamente al inicializar el componente
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers(this.currentPage).subscribe(response => {
      this.arrUsuarios = response.results;
      this.totalPages = response.total_pages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generar las páginas

    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers(); // Recargar los usuarios de la nueva página
    }
  }

  deleteUser(id: string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(id).subscribe(() => {
          this.arrUsuarios = this.arrUsuarios.filter(user => user._id !== id);

          Swal.fire({
            title: '¡Eliminado!',
            text: 'El usuario ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6'
          });
        });
      }
    });
  }

}
