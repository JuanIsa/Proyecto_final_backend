import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FecthproductsService } from 'src/app/services/fecthproducts.service';
import { FetchcartsService } from 'src/app/services/fetchcarts.service';

@Component({
  selector: 'front-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private cartServices: FetchcartsService, private productService: FecthproductsService) { }

  @Output() productsByCategory: EventEmitter<any> = new EventEmitter();
  @ViewChild('miInput') miInput: ElementRef | undefined;

  public userName?: string;
  public userImg?: string;
  public numberOfProductsOnCart: number = 0;

  ngOnInit(): void {
    this.authService.getCookie().subscribe({
      next: data => {
        this.userImg = data.message.userImg;
        this.userName = data.message.completeName;

      },
      error: e => console.log(e)
    });
    this.cartServices.myNumberObservable.subscribe({
      next: data => {
        this.numberOfProductsOnCart = data;
      },
      error: e => console.log(e)
    })
  }
  close() {
    this.authService.deleteCookie().subscribe({
      next: data => {
        console.log(data.message);
        this.router.navigate(['auth', 'login']);
      },
      error: e => console.log(e)
    });
  }

  goToCart() {
    this.router.navigate(['home', 'cart']);
  }
  searchByCategory() {
    const valor = this.miInput?.nativeElement.value;
    this.productService.findAllProductsByCategory(valor).subscribe({
      next: data => this.productsByCategory.emit(data.message),
      error: e => console.log(e)
    })
  }
}