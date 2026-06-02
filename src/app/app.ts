import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { LivroForm } from './components/livro-form/livro-form';
import { LivroList } from './components/livro-list/livro-list';
import { LivroService } from './services/livro.service';
import { Livro } from './models/livro';

@Component({
  selector: 'app-root',
  imports: [Navbar, LivroForm, LivroList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly livroService = inject(LivroService);

  livros: Livro[] = [];
  carregando = false;
  selectedLivro: Livro | null = null;

  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';
  private toastTimeout: any;

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.carregando = true;
    this.livroService.listar().subscribe({
      next: (dados) => {
        this.livros = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar livros', err);
        this.showToast('Erro ao carregar livros. Verifique se a API está rodando.', 'error');
        this.carregando = false;
      }
    });
  }

  salvarLivro(livro: Livro) {
    if (livro.id) {
      this.livroService.atualizar(livro.id, livro).subscribe({
        next: (atualizado) => {
          this.livros = this.livros.map(l => l.id === atualizado.id ? atualizado : l);
          this.selectedLivro = null;
          this.showToast(`Livro "${atualizado.titulo}" atualizado com sucesso!`, 'success');
        },
        error: (err) => {
          console.error('Erro ao atualizar livro', err);
          this.showToast('Erro ao atualizar livro.', 'error');
        }
      });
    } else {
      this.livroService.criar(livro).subscribe({
        next: (criado) => {
          this.livros = [...this.livros, criado];
          this.showToast(`Livro "${criado.titulo}" cadastrado com sucesso!`, 'success');
        },
        error: (err) => {
          console.error('Erro ao cadastrar livro', err);
          this.showToast('Erro ao cadastrar livro.', 'error');
        }
      });
    }
  }

  editarLivro(livro: Livro) {
    this.selectedLivro = livro;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicao() {
    this.selectedLivro = null;
  }

  excluirLivro(id: number | string) {
    this.livroService.excluir(id).subscribe({
      next: () => {
        this.livros = this.livros.filter(l => l.id !== id);
        this.showToast('Livro excluído com sucesso!', 'success');
        if (this.selectedLivro?.id === id) {
          this.selectedLivro = null;
        }
      },
      error: (err) => {
        console.error('Erro ao excluir livro', err);
        this.showToast('Erro ao excluir livro.', 'error');
      }
    });
  }

  private showToast(message: string, type: 'success' | 'error') {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastMessage = message;
    this.toastType = type;
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4000);
  }
}
