import { NgModule } from '@angular/core';
import { CommonModule, formatCurrency, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {StudentsListComponent} from './students/students-list/students-list.component';
const routes: Routes =[
   {
    path: 'students',
    component: StudentsListComponent,
    children: [{
      path: '',
      loadChildren: './students/students.module#StudentsModule'
    }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
