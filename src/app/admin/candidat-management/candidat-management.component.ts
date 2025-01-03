import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Candidat } from '../../services/candidat';
import { NgForm, FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-candidat-management',
  templateUrl: './candidat-management.component.html',
  styleUrls: ['./candidat-management.component.css'],
  imports: [FormsModule],
  standalone:true
})
export class CandidatManagementComponent implements OnInit {
  candidatFirstName: string = '';
  candidatLastName: string = '';
  candidatEmail: string = '';
  formationId?: number; 
  sessionIndex?: number; 
  message: string = ''; 

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {}

  registerCandidate(form: NgForm) {
    if (form.invalid) {
      this.message = 'Veuillez fournir toutes les informations nécessaires.';
      return;
    }

    const candidat = new Candidat('', this.candidatFirstName, this.candidatLastName, this.candidatEmail);

    this.formationService
      .registerCandidate(this.formationId!, this.sessionIndex!, { name: `${candidat.firstName} ${candidat.lastName}`, email: candidat.email })
      .subscribe((response) => {
        this.message = response.message;
        if (response.success) {
          this.resetForm(form);
        }
      });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.candidatFirstName = '';
    this.candidatLastName = '';
    this.candidatEmail = '';
    this.formationId = undefined;
    this.sessionIndex = undefined;
  }
}