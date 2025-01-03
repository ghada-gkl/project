import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatManagementComponent } from './candidat-management/candidat-management.component';
import { FormateurManagementComponent } from './formateur-management/formateur-management.component';
import { FormationManagementComponent } from './formation-management/formation-management.component';
import { SessionManagementComponent } from './session-management/session-management.component';

const routes: Routes = [
  { path: 'candidats', component: CandidatManagementComponent },
  { path: 'formateurs', component: FormateurManagementComponent },
  { path: 'formations', component: FormationManagementComponent },
  { path: 'sessions', component: SessionManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminModule { }
