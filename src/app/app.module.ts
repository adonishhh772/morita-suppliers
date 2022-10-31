import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {JwtModule} from '@auth0/angular-jwt';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ComponentsModule } from './Components/components.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxImageZoomModule } from "ngx-image-zoom";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { ProfileComponent } from './profile/profile.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    ComponentsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatStepperModule,
    MatTooltipModule,
    NgxImageZoomModule,
    MatBadgeModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatChipsModule,
    MatExpansionModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          // allowedDomains: ['api.myunistudy.com'],
          // disallowedRoutes: ['https://api.myunistudy.com/api/v1/']
          // allowedDomains: ['localhost:3000'],
          // disallowedRoutes: ['http://localhost:3000/api/v1/']
      }
  })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
