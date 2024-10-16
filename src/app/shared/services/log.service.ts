import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LOGS_COLLECTION } from '../utils/constants';

@Injectable({
    providedIn: 'root'
})
export class LogsService {

    constructor(private storageService: StorageService) { }

    init() {
        setInterval(async () => {
            const logs = await this.storageService.get(LOGS_COLLECTION);
            console.info('Logs:');
            console.info(logs);
        }, 20000);
    }

}