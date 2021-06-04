import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { LogoutComponent } from '../logout/logout.component';
import { OderDialogComponent } from '../oder-dialog/oder-dialog.component';
import {AboutUsComponent} from '../../about/about-us/about-us.component';
import {ContactComponent} from '../../about/contact/contact.component';
import {MapComponent} from '../../about/map/map.component';
import {AnalysisComponent} from '../analysis/analysis.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public accountDialog: MatDialog,
    public logoutDialog: MatDialog,
    public Cartdialog: MatDialog,
    public oderDialog: MatDialog,
    public aboutDialog: MatDialog,
    public analysisDialog: MatDialog,
  ) {}

  openCart() {
    this.Cartdialog.open(CartComponent);
  }

  openAccount() {
    if (localStorage.getItem("JWT") != null) {
      this.logoutDialog.open(LogoutComponent);
    }
    else {
      this.accountDialog.open(AccountDialogComponent);
    }
  }

  openOder() {
    if (localStorage.getItem("JWT") != null) {
      this.oderDialog.open(OderDialogComponent);
    }
    else {
      const accountRef = this.accountDialog.open(AccountDialogComponent);
      accountRef.afterClosed().subscribe(
        result => {
          if (result != undefined)
            if (result.check == true)
              this.openOder();
        }
      );
    }
  }

  openAnalysis(){
    this.analysisDialog.open(AnalysisComponent);
  }

  openAboutUs(){
    this.aboutDialog.open(AboutUsComponent);
  }
  openContact(){
    this.aboutDialog.open(ContactComponent);
  }
  openMap(){
    this.aboutDialog.open(MapComponent);
  }

}
