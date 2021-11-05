import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameEventsModule } from './components/game-events/game-events.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameEventsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
