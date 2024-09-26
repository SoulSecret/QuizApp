import { Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { ComputersComponent } from './components/computers/computers.component';
import { MythologyComponent } from './components/mythology/mythology.component';
import { MathComponent } from './components/math/math.component';
import { GeographyComponent } from './components/geography/geography.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { MusicComponent } from './components/music/music.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { BooksComponent } from './components/books/books.component';
import { SportsComponent } from './components/sports/sports.component';

export const routes: Routes = [
    {path: 'history', component:HistoryComponent},
    {path: 'computer', component:ComputersComponent},
    {path: 'mythology', component:MythologyComponent},
    {path: 'math', component:MathComponent},
    {path: 'geography', component:GeographyComponent},
    {path: 'vehicle', component:VehicleComponent},
    {path: 'music', component:MusicComponent},
    {path: 'animals', component:AnimalsComponent},
    {path: 'books', component:BooksComponent},
    {path: 'sports', component:SportsComponent},
];
