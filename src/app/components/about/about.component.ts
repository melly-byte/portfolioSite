import { Component, NgModule } from '@angular/core';
import { secret } from '@aws-amplify/backend';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { getUrl } from '@aws-amplify/storage';
import { OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})


export class AboutComponent {
  resumeLinkString: SafeResourceUrl | undefined;
  resumeLinkUrl: URL | undefined;

  constructor(private sanitizer: DomSanitizer){}

  async ngOnInit() {
    const linkToResume = await getUrl({
      path: "MC_R_NP.pdf"
    })
    console.log(linkToResume.url);
    this.resumeLinkString = this.sanitizer.bypassSecurityTrustUrl(linkToResume.url.toString());
    this.resumeLinkUrl = linkToResume.url;
  }
}
