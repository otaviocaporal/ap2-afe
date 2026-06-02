import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-livro-list',
  imports: [FormsModule],
  templateUrl: './livro-list.html',
  styleUrl: './livro-list.css',
})
export class LivroList {
  @Input() livros: Livro[] = [];
  @Input() carregando = false;

  @Output() editar = new EventEmitter<Livro>();
  @Output() excluir = new EventEmitter<number | string>();

  busca = '';
  categoriaFiltro = '';
  disponibilidadeFiltro = '';

  livroParaExcluir: Livro | null = null;

  get livrosFiltrados(): Livro[] {
    return this.livros.filter(livro => {
      const matchBusca = 
        livro.titulo.toLowerCase().includes(this.busca.toLowerCase()) ||
        livro.autor.toLowerCase().includes(this.busca.toLowerCase());
      
      const matchCategoria = 
        !this.categoriaFiltro || livro.categoria === this.categoriaFiltro;
      
      const matchDispo = 
        this.disponibilidadeFiltro === '' || 
        (this.disponibilidadeFiltro === 'sim' && livro.disponivel) ||
        (this.disponibilidadeFiltro === 'nao' && !livro.disponivel);

      return matchBusca && matchCategoria && matchDispo;
    });
  }

  get totalLivros(): number {
    return this.livros.length;
  }

  get totalDisponiveis(): number {
    return this.livros.filter(l => l.disponivel).length;
  }

  get totalIndisponiveis(): number {
    return this.livros.filter(l => !l.disponivel).length;
  }

  onEditar(livro: Livro) {
    this.editar.emit(livro);
  }

  confirmarExclusao(livro: Livro) {
    this.livroParaExcluir = livro;
  }

  cancelarExclusao() {
    this.livroParaExcluir = null;
  }

  executarExclusao() {
    if (this.livroParaExcluir && this.livroParaExcluir.id !== undefined) {
      this.excluir.emit(this.livroParaExcluir.id);
      this.livroParaExcluir = null;
    }
  }
}
