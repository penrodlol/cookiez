import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cookiez-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  actions = [
    {
      icon: 'home',
      label: 'Home',
    },
    {
      icon: 'user',
      label: 'Profile',
    },
  ];
  constructor() { }

  ngOnInit(): void { }

}
