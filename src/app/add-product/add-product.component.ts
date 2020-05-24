import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { addProduct, editProduct } from 'src/store/actions/product.actions';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/store/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }
  name: FormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  price: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  categories = [
    { value: 'Category 1' },
    { value: 'Category 2' },
    { value: 'Category 3' }
  ];
  selectedCategory: string = "Category 1"

  ngOnInit(): void {
    const { name = "", price = 0, category = this.categories[0].value } = this.data;

    this.name.setValue(name);
    this.price.setValue(price);
    this.selectedCategory = category;
  }

  save() {
    const { id = "" } = this.data;
    const { name, price, selectedCategory } = this;
    if (id) {
      this.store.dispatch(editProduct({
        id,
        category: selectedCategory,
        name: name.value,
        price: price.value
      }));
    } else {
      this.store.dispatch(addProduct({
        category: selectedCategory,
        name: name.value,
        price: price.value
      }));
    }


    this.close()
  }

  hasError() {
    const { name, price } = this
    const hasError = name.invalid || price.invalid;
    return hasError;
  }
  nameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.name.hasError('maxlength')) {
      return 'Max Length is 50 characters';
    }
  }
  priceErrorMessage() {
    if (this.price.hasError('min')) {
      return 'You must enter a number greater or equal to 0';
    }
  }
  close() {
    this.dialogRef.close()
  }
}
