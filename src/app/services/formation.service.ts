import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Formation } from './formation';
import { Session } from './session';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private baseURL = 'http://localhost:3000/formations'; 
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  formationsEdited = new Subject<Formation[]>();

  constructor(private httpClient: HttpClient) {}

  
  getFormations(): Observable<Formation[]> {
    return this.httpClient.get<Formation[]>(this.baseURL);
  }

 
  getFormationById(id: number): Observable<Formation> {
    return this.httpClient.get<Formation>(`${this.baseURL}/${id}`);
  }

  addFormation(
    name: string,
    description: string,
    chargeHoraire: number,
    programUrl: string,
    sessions: Session[]
  ): Observable<Formation> {
    return this.httpClient.post<Formation>(
      this.baseURL,
      JSON.stringify({
        name,
        description,
        chargeHoraire,
        programUrl,
        sessions,
      }),
      this.options
    );
  }

  // Edit a formation
  editFormation(formation: Formation): Observable<Formation> {
    return this.httpClient.put<Formation>(
      `${this.baseURL}/${formation.id}`,
      JSON.stringify({
        name: formation.name,
        description: formation.description,
        chargeHoraire: formation.chargeHoraire,
        programUrl: formation.programUrl,
        sessions: formation.session,
      }),
      this.options
    );
  }

  
  deleteFormation(id: number): Observable<Formation> {
    return this.httpClient.delete<Formation>(`${this.baseURL}/${id}`);
  }

  
  registerCandidate(
    formationId: number,
    sessionIndex: number,
    candidate: { name: string; email: string }
  ): Observable<{ success: boolean; message: string }> {
    return new Observable((observer) => {
      this.getFormationById(formationId).subscribe((formation) => {
        if (!formation) {
          observer.next({ success: false, message: 'Formation introuvable.' });
          observer.complete();
          return;
        }

        const session = formation.session[sessionIndex];
        if (!session) {
          observer.next({
            success: false,
            message: 'Session introuvable pour cette formation.',
          });
          observer.complete();
          return;
        }

        if (session.candidates.length >= 15) {
          observer.next({
            success: false,
            message: 'La session est complète.',
          });
          observer.complete();
          return;
        }

        session.candidates.push(candidate);
        observer.next({
          success: true,
          message: 'Inscription réussie !',
        });
        observer.complete();
      });
    });
  }
}
