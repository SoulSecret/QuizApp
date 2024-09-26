import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from '../../services/quiz.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Add HttpClientModule here
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  showHeader: boolean = false;
  currentQuestionIndex: number = 0;
  score: number = 0;
  isCompleted: boolean = false;
  shuffledAnswers: string[] = [];
  categoryId: number = 18;  // Set the default category to 23 (History)

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.quizService.getQuestions(this.categoryId).subscribe((data) => {
      this.questions = data.results;
      this.shuffleAnswers();
    });
  }

  shuffleAnswers() {
    const question = this.questions[this.currentQuestionIndex];
    if (question) {
      const answers = [question.correct_answer, ...question.incorrect_answers];
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
    } else {
      this.shuffleAnswers(); // Shuffle answers for the next question
    }
  }

  // Method to restart the quiz
  restart() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.isCompleted = false;
    this.loadQuestions();  // Reload the questions with the same category
  }

  // Method to set a new category dynamically and reload questions
  setCategory(categoryId: number) {
    this.categoryId = categoryId;
    this.restart();  // Restart the quiz with new category
  }
}
