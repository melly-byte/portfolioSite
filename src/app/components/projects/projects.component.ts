import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { get } from 'aws-amplify/api';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit{
  invReturn: any;
  contentSrc = "https://www.bungie.net/common/destiny2_content/screenshots/";

  async ngOnInit() {
    try {
      const restOp = await get({
        apiName: 'DestinyApiProxy',
        path: '/getCharacter',
    });
      const response = await restOp.response;
      this.invReturn = await response.body.json();
      this.invReturn = this.invReturn.Response.equipment.data.items
      console.log('Response: ', this.invReturn.Response.equipment.data);
    } catch (error) {
      console.error('Error calling function: ', error);
    } 
  }
}
