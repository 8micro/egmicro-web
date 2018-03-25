import { NgModule } from '@angular/core';
import { HomePage } from './home/home.page';
import { ActivePage } from './active/active.page';
import { LoginPage } from './login/login.page';
import { PlayerPage } from './player/player.page';
import { RegisterPage } from './register/register.page';

export * from './home/home.page';
export * from './active/active.page';
export * from './login/login.page';
export * from './player/player.page';
export * from './register/register.page';


let Pages: Array<any> = [
  HomePage,
  ActivePage,
  LoginPage,
  PlayerPage,
  RegisterPage,
];

export const PAGES = Pages;
