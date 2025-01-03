import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation-list',
  standalone: true,
  imports: [],
  templateUrl: './formation-list.component.html',
  styleUrl: './formation-list.component.css'
})
export class FormationListComponent implements OnInit{
  title='Formation List';
  search='';
  formations:any[]=[];
  constructor(private formationService:FormationService){

  }
  ngOnInit(): void {
      this.formations=this.formationService.getFormations();
  }
  fileredFormation:any[]=[];
  filteredFormation(){
    this.fileredFormation=this.formations.filter((this.formations=>
      this.formations.title.toLowerCase().includes(this.search.toLowerCase()   )
    )
  }

}
