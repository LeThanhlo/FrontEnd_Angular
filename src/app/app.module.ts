// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginModule } from './demo/authentication/login/login.module';
import { UsersModule } from './demo/Application/users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, RouterModule, LoginModule, UsersModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
