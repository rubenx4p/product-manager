import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule]
})
export class SharedModule { }
