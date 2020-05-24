import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { selectProductsDic, selectSearchProduct } from 'src/store/selectors/product.selector';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { deleteProduct, editSearch } from 'src/store/actions/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
  ) {

  }

  products = new MatTableDataSource([]);
  displayedColumns: string[] = ['name', 'category', 'price', 'date', 'actions'];

  _search: string = '';

  get search() {
    return this._search
  }

  set search(value) {
    this.store.dispatch(editSearch({ search: value }))
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.products.sort = this.sort
    this.store.pipe(select(selectProductsDic)).subscribe(products => {
      this.products = new MatTableDataSource(products);
      this.products.sort = this.sort
    });

    this.store.pipe(select(selectSearchProduct)).subscribe(search => {
      this._search = search
    });
  }
  dialogRef
  title = 'product-manager';
  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '300px',
      data: {}
    });
  }

  removeProduct(id) {
    this.store.dispatch(deleteProduct({
      id
    }));
  }

  editProduct(row) {
    const { id, name, category, price } = row;

    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '300px',
      data: {
        id,
        name,
        category,
        price
      }
    });
  }
}
