import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-livro-form',
  imports: [FormsModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css',
})
export class LivroForm {
  @ViewChild('formLivro') formDirective?: NgForm;

  @Input() set selectedLivro(val: Livro | null) {
    if (val) {
      this.livro = { ...val };
      this.isEditMode = true;
    } else {
      this.resetForm();
      this.isEditMode = false;
    }
  }

  @Output() salvar = new EventEmitter<Livro>();
  @Output() cancelar = new EventEmitter<void>();

  livro: Livro = this.initLivro();
  isEditMode = false;

  private initLivro(): Livro {
    return {
      titulo: '',
      autor: '',
      categoria: '',
      anoPublicacao: new Date().getFullYear(),
      disponivel: true
    };
  }

  resetForm() {
    this.livro = this.initLivro();
    if (this.formDirective) {
      this.formDirective.resetForm(this.livro);
    }
  }

  onSubmit() {
    this.salvar.emit(this.livro);
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.resetForm();
    this.isEditMode = false;
  }
}
