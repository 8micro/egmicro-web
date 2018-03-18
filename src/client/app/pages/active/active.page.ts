import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'active',
  templateUrl: './active.html',
  styleUrls: ['./active.css']
})

export class ActivePage implements OnInit{

  label: string;

  constructor() {

  }

  ngOnInit() {
    this.label = '8maoasdf';
  }
}
