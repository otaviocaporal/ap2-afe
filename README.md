# AP2 - Aplicações Front-End

## Identificação

Nome: Otávio Caporal  
Curso: Análise e Desenvolvimento de Sistemas  
Disciplina: Aplicações Front-End  
Instituição: ULBRA  

## Tema do projeto

CRUD de Livros com Angular e JSON Server.

## Descrição

Aplicação desenvolvida em Angular para cadastro, listagem, edição e exclusão de livros, utilizando JSON Server como API simulada. A interface foi projetada com foco em experiência do usuário premium, trazendo um dashboard futurista escuro com recursos como glassmorphism, cartões de estatísticas em tempo real, filtros de pesquisa e barra de busca avançada, notificações toast globais e modais customizados de confirmação.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML
- CSS
- JSON Server
- Git e GitHub

## Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/otaviocaporal/
```

2. Acesse a pasta do projeto:

```bash
cd ap2
```

3. Instale as dependências:

```bash
npm install
```

4. Execute a API fake:

```bash
npm run api
```

5. Em outro terminal, execute o Angular:

```bash
npm start
```

6. Acesse no navegador:

```txt
http://localhost:4200
```

## Link do vídeo demonstrativo



## Funcionalidades

- **Cadastro de registros**: Formulário com validações avançadas (obrigatoriedade de campos, mínimo de caracteres e limites para o ano de publicação).
- **Listagem de registros**: Dashboard com listagem dinâmica e estatísticas de livros em tempo real (Total de livros, Disponíveis e Emprestados).
- **Filtros e Busca**: Filtragem instantânea por busca textual de título/autor, seletor de categorias e seletor de disponibilidade.
- **Edição de registros**: Fluxo completo de edição que carrega os dados clonados de volta ao formulário principal e permite salvamento ou cancelamento sem alteração indevida in-place.
- **Exclusão de registros**: Ação de exclusão com modal de confirmação elegante integrado na interface do sistema.
- **Integração com JSON Server**: Comunicação e sincronização completa de dados com API REST local simulada.