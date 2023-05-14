import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FetchcartsService } from 'src/app/services/fetchcarts.service';


@Component({
  selector: 'front-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private cartService: FetchcartsService) { }
  public cartUser: any[] = [];
  private emailUser: string = "";
  public total: number = 0;
  public endBuyButon: boolean = true;

  ngOnInit(): void {
    this.controlButton();
    this.authService.getCookie().subscribe({
      next: data => {
        this.emailUser = data.message.email;
        this.cartService.getProductsFromCartByEmail(data.message.email).subscribe({
          next: data => {
            this.cartUser = data.info;
            this.total = data.info.reduce((acum: number, el: any) => acum + el.cant * el.price, 0);
          },
          error: e => console.log(e)
        })
      },
      error: e => console.log(e)
    });
  }
  controlButton(): void {
    this.cartService.myNumberObservable.subscribe({
      next: data => {
        if (data < 1) {
          this.endBuyButon = false;
        } else {
          this.endBuyButon = true;
        }
      },
      error: e => console.log(e)
    });
  }
  goToHome(): void {
    this.router.navigate(['home']);
  }
  deleteProduct(product: any): void {
    const question = confirm(`¿Realmente querés borrar: ${product.product}?`);
    if (question) {
      this.cartService.deleteProducOfCart(this.emailUser, { code: product.code }).subscribe({
        next: () => {
          this.controlButton();
          this.cartUser = this.cartUser.filter(el => el.code != product.code)
          this.total = this.cartUser.reduce((acum: number, el: any) => acum + el.cant * el.price, 0);
          this.cartService.getProductsFromCartByEmail(this.emailUser).subscribe({
            next: data => {
              this.cartService.itemsCart$.next(data.info.reduce((acum: number, el: any) => acum + el.cant, 0));
            },
            error: e => console.log(e)
          })

        },
        error: e => console.log(e)
      })
    }
  }
  finishbuy() {
    this.cartService.endBuy(this.emailUser, this.cartUser).subscribe({
      next:(data) => {
        alert(`${data.info.email} finalizaste correctamente tu compra`);
        this.goToHome();
      },
      error: e => console.log(e)
    });
  }
}
