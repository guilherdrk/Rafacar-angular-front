import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
})
export class HomeDashboardComponent {
  constructor(private router: Router) {}

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  stop(ev: MouseEvent) {
    ev.stopPropagation();
  }
}
