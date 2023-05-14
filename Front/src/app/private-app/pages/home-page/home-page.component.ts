import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FecthproductsService } from 'src/app/services/fecthproducts.service';
import { FetchcartsService } from 'src/app/services/fetchcarts.service';

@Component({
    selector: 'front-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor(private authService: AuthService, private productsServices: FecthproductsService, private cartService: FetchcartsService) { }
    public pages: any[] = [];
    public actualPage: number = 1;
    public userRole?: string;
    public showFormAdmin: boolean = false;
    public allproducts: any[] = [];
    public prevClass: string = 'disabled';
    public nextClass: string = '';

    ngOnInit(): void {
        this.authService.getCookie().subscribe({
            next: data => {
                this.userRole = data.message.role;
                if (this.userRole == "admin") {
                    this.showFormAdmin = true;
                }
                this.cartService.getProductsFromCartByEmail(data.message.email).subscribe({
                    next: data => {
                        this.cartService.itemsCart$.next(data.info.reduce((acum: number, el: any) => acum + el.cant, 0));
                    },
                    error: e => console.log(e)
                })
            },
            error: e => console.log(e)
        });
        this.callBakcend();
    }

    callBakcend(): void {
        //Obtengo los productos de manera paginada
        this.productsServices.getProducts(1).subscribe({
            next: data => {
                this.allproducts = data.data.products;
                for (let i = 1; i <= data.data.pages; i++) {
                    let aux: any = {};
                    aux['class'] = '';
                    aux['i'] = i;
                    if(data.data.pages>this.pages.length){
                        this.pages.push(aux);
                    }
                }
                this.pages[0].class = 'active';
            },
            error: e => console.log(e)
        })
    }
    prevPage() {
        if (this.actualPage > 1) {
            this.actualPage -= 1;
            this.productsServices.getProducts(this.actualPage).subscribe({
                next: data => this.allproducts = data.data.products,
                error: e => console.log(e)
            })
            for (let i = 0; i <= this.pages.length - 1; i++) {
                this.pages[i].class = '';
            }
            this.pages[this.actualPage - 1].class = 'active';
        }
        if (this.actualPage == 1) {
            this.prevClass = 'disabled';
        } else {
            this.prevClass = '';
        }
        if (this.actualPage == this.pages.length) {
            this.nextClass = 'disabled';
        } else {
            this.nextClass = '';
        }
    }
    postPage() {
        if (this.actualPage < this.pages.length) {
            this.actualPage += 1;
            this.productsServices.getProducts(this.actualPage).subscribe({
                next: data => this.allproducts = data.data.products,
                error: e => console.log(e)
            })
            for (let i = 0; i <= this.pages.length - 1; i++) {
                this.pages[i].class = '';
            }
            this.pages[this.actualPage - 1].class = 'active';
        }
        if (this.actualPage == 1) {
            this.prevClass = 'disabled';
        } else {
            this.prevClass = '';
        }
        if (this.actualPage == this.pages.length) {
            this.nextClass = 'disabled';
        } else {
            this.nextClass = '';
        }
    }
    pagination(page: any): void {
        for (let i = 0; i <= this.pages.length - 1; i++) {
            this.pages[i].class = '';
        }
        this.actualPage = page.i;
        page.class = 'active';
        this.productsServices.getProducts(this.actualPage).subscribe({
            next: data => this.allproducts = data.data.products,
            error: e => console.log(e)
        })
        if (this.actualPage == 1) {
            this.prevClass = 'disabled';
        } else {
            this.prevClass = '';
        }
        if (this.actualPage == this.pages.length) {
            this.nextClass = 'disabled';
        } else {
            this.nextClass = '';
        }
    }
    productsByCategory(data: any) {
        if (data.length < 1) {
            alert("No existe esa categoria que estás buscando.")
        } else {
            this.allproducts = data;
        }
    }
}
