
# CS Skins Store Frontend

Frontend desenvolvido com **Next.js** para listar e filtrar skins de CS:GO, integrando com a API que lista skins e permite a aplicação de filtros baseados em nome, float, preço e categoria. O projeto também utiliza **Chakra UI** para o design e componentes e segue boas práticas de desenvolvimento com **Jest** para testes unitários.

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)
- [Testes](#testes)

## Descrição do Projeto

Este projeto é o frontend da aplicação **CS Skins Store**, que consome a API do **NestJS** para exibir e filtrar skins do jogo **CS:GO**. Ele oferece uma interface intuitiva e responsiva para os usuários interagirem com as skins, permitindo:
- Filtragem por nome da skin
- Filtragem por float (0.0 - 1.0)
- Filtragem por preço
- Filtragem por categoria (rifles, facas, etc.)

O design da aplicação foi construído com **Chakra UI** para garantir uma interface de usuário moderna e acessível, além de seguir boas práticas de performance e acessibilidade do **Next.js**.

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de aplicativos web modernos.
- **React**: Biblioteca para criação de interfaces de usuário.
- **Chakra UI**: Biblioteca de componentes para React com foco em acessibilidade e responsividade.
- **Axios**: Cliente HTTP usado para requisições à API.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **TypeScript**: Linguagem de programação com tipagem estática.
- **Framer Motion**: Biblioteca de animação para React.

## Requisitos

- **Node.js** (versão >= 18.x)
- **npm** ou **yarn** (gerenciador de pacotes)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/usuario/csskin-front.git
    cd csskin-front
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie o arquivo `.env` na raiz do projeto com a URL da API:

    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

## Rodando o Projeto

### Ambiente de Desenvolvimento

Para rodar o projeto em ambiente de desenvolvimento, use o comando:

```bash
npm run dev
```

O frontend estará acessível em `http://localhost:3001` ou na porta padrão configurada no Next.js.

### Ambiente de Produção

Para compilar o projeto para produção, use:

```bash
npm run build
```

E para rodar a versão compilada:

```bash
npm run start
```

## Estrutura de Pastas

A estrutura de pastas foi organizada para garantir a modularidade e separação de responsabilidades:

```
src/
  ├── components/           # Componentes reutilizáveis (molecules, organisms)
  ├── hooks/                # Hooks customizados
  ├── lib/                  # Configurações auxiliares (e.g., axios)
  ├── pages/                # Páginas da aplicação Next.js
  ├── services/             # Comunicação com a API (Axios)
  ├── styles/               # Temas e configurações do Chakra UI
  ├── theme/                # Arquivos de tema do Chakra UI
  └── utils/                # Funções utilitárias (e.g., formatação de dados)
```

## Boas Práticas Implementadas

- **Responsabilidade Única**: Componentes são divididos em **molecules** e **organisms**, seguindo o Atomic Design.
  
- **Hooks Customizados**: Hooks como `useItems` e `useCategories` facilitam a reutilização de lógica de busca e filtros.
  
- **Componentização com Chakra UI**: O uso do **Chakra UI** para criar interfaces acessíveis e consistentes com pouca configuração adicional.
  
- **Axios**: A comunicação com a API é centralizada em um serviço Axios para facilitar a manutenção e o tratamento de erros.

## Testes

O projeto utiliza **Jest** e **Testing Library** para testes unitários. Para rodar os testes, execute:

```bash
npm run test
```

Os testes cobrem os principais componentes e hooks da aplicação, garantindo que as interações com a API e a UI estejam funcionando corretamente.

---