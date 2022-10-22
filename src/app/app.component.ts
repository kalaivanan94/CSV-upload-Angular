import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/service/manage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	//title = 'Excel-Angular';
	rowStatus :any        = [];
	headersRow:any        = []; 
	rows:any        = []; 
	attachment: any;
	rowData: any;
  
	constructor(
		public manageServ  : ManageService,
	  ) {
	}
	ngOnInit(): void {
		
	}
	
	selectFile(event:any){
		console.log(event.srcElement.files);
		let input = event.target;  
        let reader = new FileReader();  
		reader.readAsText(input.files[0]);   
		reader.onload = () => {  
		  this.attachment = input.files[0];  
		  this.headersRow = [];
		  this.rowStatus = [];
		  let csvData = reader.result;
		  this.rowData =  reader.result;   
		  let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
		  //console.log("csvRecordsArray",csvRecordsArray[0].split(','));
		  this.headersRow = csvRecordsArray[0].split(',');
console.log("this.headersRow",this.headersRow);		  
console.log("this.this.rowData",this.rowData);	
this.uploadCSV();	  
		};   
		reader.onerror = function () {  
		  console.log('error is occured while reading file!');  
		}; 
	}
	uploadCSV(){
		this.rows = [];
		let main_form: FormData = new FormData();  
		main_form.append('rowData',this.rowData);
		main_form.append('file',this.attachment);
		this.manageServ.csvUpload(main_form).subscribe((data:any) => {
			console.log("data",data);
			if(data.status == 200){ console.log("data.body",data.body);
				if(data.body.success == 1){ console.log("data.body.csvData",data.body.csvData)
				this.rows = data.body.csvData; 
			  }
			}		  
		})
	}

}
