import { NgModule } from '@angular/core';
import { HomePage } from './home/home.page';
import { ActivePage } from './active/active.page';
import { LoginPage } from './login/login.page';

export * from './home/home.page';
export * from './active/active.page';
export * from './login/login.page';

let Pages: Array<any> = [
  HomePage,
  ActivePage,
  LoginPage,
];

export const PAGES = Pages;
