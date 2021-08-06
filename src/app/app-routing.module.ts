import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { RemovalComponent } from './removal/removal.component';

const routes: Routes = [
  { path: 'Listar', component: ListComponent },
  { path: 'Alterar', component: RegisterComponent, data: { isUpdate: true } },
  { path: 'Inserir', component: RegisterComponent },
  { path: 'Excluir', component: RemovalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
