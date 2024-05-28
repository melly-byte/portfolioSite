import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { NgModule } from '@angular/core';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: 'contact', component: ContactComponent }, 
    { path: 'resume', component: AboutComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
