import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/common-services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private notify: NotificationService) { }

  ngAfterViewInit(): void {
 
  }

  ngOnInit(): void {



  }




}
