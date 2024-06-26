import { Component } from '@angular/core';
import { DestinyApiService } from '../../services/DestinyApiService';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  providers: [DestinyApiService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent implements OnInit{
  invReturn: any;
  contentSrc = "https://www.bungie.net/common/destiny2_content/screenshots/";
  hunterId = environment.HUNTER_CHAR_ID;

  constructor(private destinyApiService: DestinyApiService) {}

  async ngOnInit() {
    try {
      this.invReturn = this.destinyApiService.getCharacterInventory(this.hunterId)?.subscribe(
        data => {this.invReturn = data.Response.equipment.data},
      );
      console.log('Character Inventory: ', this.invReturn);
    } catch (error) {
      console.error('Error fetching character inventory: ', error);
    }
  }
}
