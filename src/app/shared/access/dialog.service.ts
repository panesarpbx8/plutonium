import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Dialog } from '../types/dialog';

// @Injectable({ providedIn: 'root' })
// export class DialogService {

//   private dialog: Subject<Dialog> = new BehaviorSubject(null);

//   readonly dialog$: Observable<Dialog> = this.dialog.asObservable();

//   constructor() {}



// }

@Injectable({ providedIn: 'root' })
export class DialogService extends BehaviorSubject<Dialog> {

  constructor() {
    super(null);
  }

}