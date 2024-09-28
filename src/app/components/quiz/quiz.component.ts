import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Add HttpClientModule here
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  showHeader: boolean = true; 
  questions: Question[] = []; // Use the Question interface here
  currentQuestionIndex: number = 0;
  score: number = 0;
  isCompleted: boolean = false;
  shuffledAnswers: string[] = [];
  categoryId: number = 9; 
  timeLeft: number = 15; 
  timerSubscription: any; 
  isLoading: boolean = true; 
  errorMessage: string | null = null; 

  constructor(private quizService: QuizService,  private router: Router) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

//   loadQuestions() {
//     this.isLoading = true; 
//     this.errorMessage = null; 

//     this.quizService.getQuestions(this.categoryId).subscribe({
//       next: (data) => {
//         if (data && data.results && Array.isArray(data.results)) {
//           this.questions = data.results.map((question: any) => ({
//             question: this.decodeHtml(question.question),
//             correct_answer: question.correct_answer,
//             incorrect_answers: question.incorrect_answers,
//           }));
//           this.shuffleAnswers();
//           this.startTimer();
//         } else {
//           this.errorMessage = 'Unexpected data structure received.';
//         }
//       },
//       error: (err) => {
//         console.error('Failed to fetch questions', err);
//         this.errorMessage = 'Failed to fetch questions. Please try again later.';
//       },
//       complete: () => {
//         this.isLoading = false; 
//       }
//     });
// }
loadQuestions() {
  this.isLoading = true;
  this.errorMessage = null;

  this.quizService.getQuestions().subscribe({
    next: (data) => {
      if (data && data.results && Array.isArray(data.results)) {
        // Filter questions by categoryId before processing
        const filteredQuestions = data.results.filter((question: any) => question.categoryId === this.categoryId);

        if (filteredQuestions.length > 0) {
          // Shuffle questions after filtering
          this.questions = this.shuffleArray(filteredQuestions.map((question: any) => ({
            question: this.decodeHtml(question.question),
            correct_answer: question.correct_answer,
            incorrect_answers: question.incorrect_answers,
          })));

          // Start with the first question
          this.currentQuestionIndex = 0;
          this.shuffleAnswers(); // Shuffle answers for the first question
          this.startTimer(); // Start the timer after loading questions
        } else {
          this.errorMessage = 'No questions found for the selected category.';
        }
      } else {
        this.errorMessage = 'Unexpected data structure received.';
      }
    },
    error: (err) => {
      console.error('Failed to fetch questions', err);
      this.errorMessage = 'Failed to fetch questions. Please try again later.';
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

// Shuffle function
shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}



  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  shuffleAnswers() {
    const question = this.questions[this.currentQuestionIndex];
    if (question) {
        // Decode all answers before shuffling
        const answers = [
            this.decodeHtml(question.correct_answer),
            ...question.incorrect_answers.map(this.decodeHtml) // Decode each incorrect answer
        ];
        this.shuffledAnswers = answers.sort(() => Math.random() - 0.5); // Shuffle answers
    }
}

  answer(selectedAnswer: string) {
    const correctAnswer = this.questions[this.currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.questions.length) {
      this.isCompleted = true;
      this.stopTimer();
    } else {
      this.shuffleAnswers(); 
      this.resetTimer(); 
    }
  }

  restart() {
    this.router.navigate(['/']); // Navigate to the home page
  }
  setCategory(categoryId: number) {
    this.categoryId = categoryId;
    this.restart(); 
  }

  startTimer() {
    this.timeLeft = 15; 
    this.timerSubscription = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timerSubscription); 
    this.startTimer(); 
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.resetTimer(); 
    if (this.currentQuestionIndex === this.questions.length) {
      this.isCompleted = true;
      this.stopTimer();
    } else {
      this.shuffleAnswers(); 
    }
  }

  stopTimer() {
    clearInterval(this.timerSubscription);
  }
}
