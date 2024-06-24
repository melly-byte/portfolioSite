import { Component } from '@angular/core';
import { get } from 'aws-amplify/api'
//import { post } from '@aws-amplify/api';
//import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  async callFunc() {
    try {
      const restOp = get({
        apiName: 'RestApi',
        path: '/hello',
      });
      const response = await restOp.response;
      const responseBody = await response.body.text();
      console.log('Response: ', responseBody);
    } catch (error) {
      console.error('Error calling function: ', error);
    }
  }
}
