import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFpTsModule } from 'ngx-fp-ts';

import { AppComponent } from './app.component';
import { GameEventsModule } from './components/game-events/game-events.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameEventsModule,
    NgxFpTsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
