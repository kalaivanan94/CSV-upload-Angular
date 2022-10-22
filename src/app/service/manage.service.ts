import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

	constructor(private http: HttpClient) { }
	
	  csvUpload(payload){ console.log(payload);
		const headerSettings: { [name: string]: string | string[]; } = {};
		const req = new HttpRequest('POST', SERVER_URL+'api/excel/csvupload', payload);
		const newHeader = new HttpHeaders(headerSettings);
		let changedRequest = req.clone({
		  headers: newHeader
		});

		return this.http.request(changedRequest);
	  }
}
