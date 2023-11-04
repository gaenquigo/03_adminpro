import { Component, OnInit } from '@angular/core';
import { elements } from 'chart.js';
import { AccountServiceService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
 

  constructor(private accountServices : AccountServiceService){
  }

  ngOnInit() {
        this.accountServices.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.accountServices.changeTheme(theme);
    }

}
