import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from './services/quiz.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule],
  providers: [QuizService],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizApp';
  showHeader: boolean = true;
  selectedCategory: string = ''; // Variable to hold the selected category

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide the header when navigating away
        this.showHeader = !this.router.url.includes('/history') &&
                          !this.router.url.includes('/computer') &&
                          !this.router.url.includes('/mythology') &&
                          !this.router.url.includes('/math') &&
                          !this.router.url.includes('/geography') &&
                          !this.router.url.includes('/vehicle') &&
                          !this.router.url.includes('/music') &&
                          !this.router.url.includes('/animals') &&
                          !this.router.url.includes('/books') &&
                          !this.router.url.includes('/sports') &&
                          !this.router.url.includes('/ge');
      }
    });
  }

  startQuiz() {
    if (this.selectedCategory) {
      this.router.navigate([this.selectedCategory]); // Navigate to the selected category
    }
  }

  onCategoryChange() {
    // Optionally handle category changes if needed
  }
}
