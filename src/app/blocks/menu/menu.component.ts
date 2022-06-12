import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/common-services/user.service';
import { MenuItemDto } from 'src/app/core/data-models/identity.data.models';
import { AuthenticationDataService } from 'src/app/core/data-services/identity/authentication.data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  menuItems: MenuItemDto[] = [];
  toggleSidebar: boolean = true;
  toggleMenuItem: boolean = true;
  userProfileImageUrl = '';
  selectedIndex: number;
  userName = '';
  
  showSidebar() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  showMenuItem() {
    this.toggleMenuItem = !this.toggleMenuItem;
  }

  constructor(private userService: UserService,
    private authenticationService: AuthenticationDataService) { }

  ngOnInit(): void {
    this.userProfileImageUrl = this.userService.getProfileImage();
    this.userName = this.userService.getUserName();
    this.menuItems = this.userService.getUserMenu();
    // this.authenticationService.userMenuLogistics(this.userService.getCurrentSystemLanguage()).subscribe(res => {
    //   this.userService.setUserMenu(res[0].submenu!);
    //   this.menuItems = this.userService.getUserMenu();
    // })
  }

  logout() {
    this.userService.logout();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  getSubMenuList(row: MenuItemDto): MenuItemDto[] {
    if (row.submenu) {
      if (row.submenu.length > 0) {
        return row.submenu;
      }
    }
    return [];
  }

  select(index: number) {
    this.selectedIndex = index;
  }
}