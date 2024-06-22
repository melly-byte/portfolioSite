import { Component } from '@angular/core';
import { post } from '@aws-amplify/api';
import { sayHello } from '../../../../amplify/functions/functionTest/resource';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /*
  async onClick() {
    try {
      const response = sayHello;
      console.log('Response: ', response);
    } catch (error) {
      console.error('Error calling function: ', error);
    }
  }*/
}
