import { Directive, OnInit } from '@angular/core';
import { NxSidebarComponent } from '@aposin/ng-aquila/sidebar';

@Directive({
  selector: '[cookiezSidebar]'
})
export class SidebarDirective implements OnInit {

  constructor(private sidebar: NxSidebarComponent) { }

  ngOnInit(): void {
    this.sidebar.close();
  }

}
