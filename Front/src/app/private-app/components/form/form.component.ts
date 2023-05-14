import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FecthproductsService } from 'src/app/services/fecthproducts.service';

@Component({
  selector: 'front-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private authsvc: AuthService, private productsvc: FecthproductsService) { }
  public formProduct: FormGroup = new FormGroup({});
  @Output() changeList: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.formProduct = new FormGroup(
      {
        product: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required]),
        urlImgProduct: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        stock: new FormControl('', [Validators.required, Validators.min(0)])
      }
    )
  }
  addproduct(): void {
    if (this.formProduct.valid) {
      alert('Todos los campos deben estar completos');
    } else {
      this.productsvc.addProduct(this.formProduct.value).subscribe({
        next: data => {
          if (data.status == 0) {
            alert(`Producto añadido correctamente con el id: ${data.message._id}`);
            this.changeList.emit();
          } else {
            alert(`${data.message}`);
          }
        },
        error: e => console.log(e)
      })
    }
  }
}
