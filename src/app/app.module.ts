import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// google map
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// style material
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


//custom component 
import { DrawingBoardComponent } from 'src/app/components/drawing-board/drawing-board.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { TaskComponent } from './components/firebase/task/task.component';
import { TaskDialogComponent } from './components/firebase/task-dialog/task-dialog.component';
import { TaskContainerComponent } from './components/firebase/task-container/task-container.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    DrawingBoardComponent,
    NavBarComponent,
    TaskComponent,
    TaskDialogComponent,
    TaskContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    DragDropModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
