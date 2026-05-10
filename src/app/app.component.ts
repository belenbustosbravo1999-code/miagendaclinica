import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  homeOutline, home,
  calendarOutline, calendar,
  peopleOutline, people,
  personOutline, person,
  logOutOutline,
  medkitOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class AppComponent {
  constructor(public router: Router) {
    addIcons({
      'home-outline': homeOutline,
      'home': home,
      'calendar-outline': calendarOutline,
      'calendar': calendar,
      'people-outline': peopleOutline,
      'people': people,
      'person-outline': personOutline,
      'person': person,
      'log-out-outline': logOutOutline,
      'medkit-outline': medkitOutline,
    });
  }

  get mostrarTabs(): boolean {
    const url = this.router.url;
    return url !== '/' && !url.startsWith('/login') && !url.startsWith('/not-found');
  }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  navTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
