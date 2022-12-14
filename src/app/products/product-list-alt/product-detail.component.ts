import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map, Subject } from 'rxjs';
import { Supplier } from 'src/app/suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  product: Product | null = null;
  productSuppliers: Supplier[] | null = null;

  product$ = this.productService.selectedProduct$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  pageTitle$ = this.product$
    .pipe(
      map(p => p ? `Product Detail for: ${p.productName}` : null)
    )

  productSuppliers$ = this.productService.selectedProductSuppliers$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )


  constructor(private productService: ProductService) { }

}
