import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../../services/formation.service';
@Component({

  selector: 'app-formation-details',
  standalone: true,
  imports: [],
  templateUrl: './formation-details.component.html',
  styleUrl: './formation-details.component.css'
})
export class FormationDetailsComponent implements OnInit {
  formation: any;
  candidate = { name: '', email: '' };

  constructor(
    private route: ActivatedRoute,
    @Inject(FormationService) private formationService: FormationService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formation = this.formationService.getFormationById(id);
  }

  register(sessionIndex: number) {
    this.formationService.registerCandidate(sessionIndex, this.formation.id, this.candidate).subscribe(response => {
      alert(response.message);
      this.candidate = { name: '', email: '' };
    });
  }

  isFull(session: any) {
    return session.candidates && session.candidates.length >= 15;
  }

  downloadPDF() {
    const programUrl = this.formation.programUrl; 
    window.open(programUrl, '_blank');
  }
}




