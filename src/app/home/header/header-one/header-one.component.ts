import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service'

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.css']
})
export class HeaderOneComponent implements OnInit {

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
  }

}
