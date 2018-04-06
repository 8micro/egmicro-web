import { Injectable } from '@angular/core'

@Injectable()
export class Logger {
    constructor() {

    }
    
    log( logString: string) {
        console.log(logString);
    }
}
