import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FecthproductsService } from 'src/app/services/fecthproducts.service';
import { FetchcartsService } from 'src/app/services/fetchcarts.service';

@Component({
  selector: 'front-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private dataProductsSvs: FecthproductsService, private authService: AuthService, private cartService: FetchcartsService) { }
  @Output() changeList: EventEmitter<void> = new EventEmitter();
  @Input() infoProduct!: any;

  public userRole: string = "user";
  public userEmail: string = "";
  public formProduct: FormGroup = new FormGroup({});
  public administrador: boolean = false;
  public cant: number = 1;

  ngOnInit(): void {
    this.formProduct = new FormGroup(
      {
        product: new FormControl(this.infoProduct.product, [Validators.required]),
        description: new FormControl(this.infoProduct.description, [Validators.required]),
        category: new FormControl(this.infoProduct.category, [Validators.required]),
        code: new FormControl(this.infoProduct.code, [Validators.required]),
        urlImgProduct: new FormControl(this.infoProduct.urlImgProduct, [Validators.required]),
        price: new FormControl(this.infoProduct.price, [Validators.required]),
        stock: new FormControl(this.infoProduct.stock, [Validators.required])
      }
    )
    this.authService.getCookie().subscribe({
      next: data => {
        this.userRole = data.message.role;
        this.userEmail = data.message.email;
        if (this.userRole == "admin") {
          this.administrador = true;
        }
      },
      error: e => console.log(e)
    });


  }
  //Método para el administrador 
  deleteProduct(): void {
    let opcion = confirm(`¿Realmente querés borrar el producto: ${this.infoProduct.product}`);
    if (opcion) {
      this.dataProductsSvs.deleteProduct(this.infoProduct.code).subscribe({
        next: () => this.changeList.emit(),
        error: e => console.log(e)
      })
      this.changeList.emit();
    }
  }
  //Método para el administrador 
  updateProduct(): void {
    if (
      this.formProduct.get('product')?.errors?.['required'] ||
      this.formProduct.get('description')?.errors?.['required'] ||
      this.formProduct.get('category')?.errors?.['required'] ||
      this.formProduct.get('code')?.errors?.['required'] ||
      this.formProduct.get('urlImgProduct')?.errors?.['required'] ||
      this.formProduct.get('price')?.errors?.['required'] ||
      this.formProduct.get('stock')?.errors?.['required']
    ) {
      alert('Todos los campos deben estar completos');
    } else {
      this.dataProductsSvs.updateProduct(this.infoProduct.code, this.formProduct.value).subscribe({
        next: () => this.changeList.emit(),
        error: e => console.log(e)
      });

    }
  }

  //Método para incrementar el contador de unidades a agregar-
  addCant(): void {
    if (this.cant < this.infoProduct.stock) {
      this.cant++;
    }
  }
  //Método para decrementar el contador de unidades a agregar-
  substractCant(): void {
    if (this.cant > 1) {
      this.cant--;
    }
  }
  esCero(): boolean {
    if (this.cant == 0) {
      return true
    } else {
      return false;
    }
  }
  //Función que se ejecuta al apretar el botón de agregar al carrito.
  addToCart(): void {
    if (this.infoProduct.stock >= 1) {
      this.esCero();
      this.infoProduct['cant'] = this.cant;
      this.cartService.addProductsOnCartByMail(this.userEmail, this.infoProduct).subscribe({
        next: infoBack => {
          if (infoBack.info.message != "") {
            alert(infoBack.info.message);
          } else {
            this.cartService.getProductsFromCartByEmail(this.userEmail).subscribe({
              next: data => {
                this.cartService.itemsCart$.next(data.info.reduce((acum: number, el: any) => acum + el.cant, 0));
                this.infoProduct.stock -= this.cant;
                if (this.infoProduct.stock == 0) {
                  this.cant = 0;
                } else {
                  this.cant = 1;
                }

              },
              error: e => console.log(e)
            })
          }
        },
        error: e => console.log(e)
      })
    }else{
      alert("No hay productos en stock");
    }
  }
}
