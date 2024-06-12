import { Component, OnInit } from '@angular/core';
import { RolIdService } from '../../services/rol-id.service';
import { ExistService } from '../../services/client/exist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  rol_id :any;
   //datas: Observable<User>;
  user$: any;
  apiResponse: any;
  httpRespond: any;

  constructor(
    private existuser: ExistService,
    private rolidservice: RolIdService,
  ) {}

  ngOnInit(): void {
    // this.rol_id = this.rolidservice.getRolID();
    // console.log('El rol es: ',this.rol_id);
    // //console.log(this.datas = this.userSharingService.userSharing);
    // this.existuser.existTrading(this.rol_id).subscribe((response) => {
    //   console.log(response);
    //   console.log(response.body.data.length);
    // });

    // this.existuser.existWarehouse(this.rol_id).subscribe((response) => {
    //   console.log(response);
    //   console.log(response.body.data.length);
    // }
  // )

  }
}



