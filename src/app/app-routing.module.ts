import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import { DrawingBoardComponent } from 'src/app/components/drawing-board/drawing-board.component';
import { TaskContainerComponent } from 'src/app/components/firebase/task-container/task-container.component';

const routes: Routes = [
  { path: 'home', component: GoogleMapComponent },
  { path: 'firebase', component: TaskContainerComponent },
  { path: '', component: DrawingBoardComponent },
  { path: 'search', component: DrawingBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
