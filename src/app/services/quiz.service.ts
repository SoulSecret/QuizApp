import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  // Method to get questions with a dynamic category ID
  getQuestions(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}?amount=10&category=${categoryId}&difficulty=medium&type=multiple`;
    return this.http.get(url);
  }
}
