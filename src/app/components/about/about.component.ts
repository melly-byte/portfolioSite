import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getUrl } from '@aws-amplify/storage';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})


export class AboutComponent /*implements OnInit*/ {
  /*
  url: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    const resumeLink = await getUrl({path: 'resume/MC_R_NP.pdf'});
    this.url = resumeLink ? this.sanitizer.bypassSecurityTrustResourceUrl(resumeLink.url.toString()) : undefined;
  }
  /*
  get trustedPdfUrl() {
    return this.url ? this.sanitizer.bypassSecurityTrustResourceUrl(this.url) : null;
  }*/
}
