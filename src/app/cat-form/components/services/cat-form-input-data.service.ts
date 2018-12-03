import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class CatFormGetDataService {

	// Observable string sources
	private dataElementSource = new Subject<any>();
	private missionConfirmedSource = new Subject<string>();
	private data = [];
	private cont = 0;
	// Observable string streams
	dataElement$ = this.dataElementSource.asObservable();
	missionConfirmed$ = this.missionConfirmedSource.asObservable();

	setData(data: []) {
		this.data = data;
	}

	// Service message commands
	getDataElement() {
		const data = this.data[this.cont];
		this.cont++;
		return data;
	}

	confirmMission(astronaut: string) {
		this.missionConfirmedSource.next(astronaut);
	}
}
