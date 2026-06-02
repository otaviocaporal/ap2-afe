export interface Livro {
  id?: number | string;
  titulo: string;
  autor: string;
  categoria: string;
  anoPublicacao: number;
  disponivel: boolean;
}
