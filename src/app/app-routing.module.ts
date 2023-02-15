import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import { DrawingBoardComponent } from 'src/app/components/drawing-board/drawing-board.component';
const routes: Routes = [
  { path: 'googleMap', component: GoogleMapComponent },
  { path: '', component: DrawingBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
