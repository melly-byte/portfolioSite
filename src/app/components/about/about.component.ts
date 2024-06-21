import { Component} from '@angular/core';
import { getUrl } from '@aws-amplify/storage';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})


export class AboutComponent implements OnInit {
  url: string | undefined;

  async ngOnInit() {
    const resumeLink = await getUrl({path: 'resume/MC_R_NP.pdf'});
    this.url = resumeLink.url.toString();
  }
}
