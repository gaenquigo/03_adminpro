import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';

declare function custonInitFuntions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{

  constructor(private accountServices : AccountServiceService){

  }
  ngOnInit() {
    custonInitFuntions();
  }




    



}
