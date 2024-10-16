import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { StorageService } from './shared/services/storage.service';
import { Router } from '@angular/router';
import { ACCESS_TOKEN } from './shared/utils/constants';
import { LogsService } from './shared/services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService: StorageService, public router: Router, public logService: LogsService) {
    this.init()
  }

  async init() {
    initializeApp(environment.firebaseConfig);
    await this.storageService.init();
    this.logService.init();

    const token = await this.storageService.get(ACCESS_TOKEN);
    if(token) {
      this.router.navigateByUrl('/home');
    }

  }
}
