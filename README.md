# Aplicação Frontend - Desafio LuizaLabs

Esta é a implementação do frontend para o Desafio Técnico Full Stack do LuizaLabs. O projeto consiste em uma interface de usuário reativa e moderna para consumir a API de Produtos Favoritos, permitindo que os clientes gerenciem suas listas de forma intuitiva.

## 📝 Sobre o Projeto

O projeto é APP construído com **React.js** e **TypeScript**, focado em oferecer uma experiência de usuário fluida e responsiva. A aplicação permite que os usuários se cadastrem, façam login e gerenciem completamente suas listas de produtos favoritos, desde a criação da lista até a adição e remoção de produtos.

## 🚀 Tecnologias e Arquitetura

Este projeto foi construído utilizando um ecossistema de ferramentas modernas do universo React:

- **Core:** React.js, TypeScript, Bun
- **UI e Estilização:** Chakra UI v3, React Icons
- **Gerenciamento de Estado:** Zustand
- **Formulários:** Formik e Yup
- **Desenvolvimento de Componentes:** Design Atômico
- **Cliente HTTP:** Axios

### ✨ Decisões de Arquitetura

1.  **Design Atômico:** A estrutura de componentes segue a metodologia do Design Atômico (Átomos, Moléculas, Organismos, etc.) para promover a reutilização, facilitar os testes e garantir a consistência visual.

2.  **Estado Global com Zustand:** O Zustand foi escolhido por sua simplicidade e performance para gerenciar o estado global da aplicação, como a sessão do usuário e a lista de favoritos.

3.  **Fluxo de Dados "Pessimista":** Para garantir que a UI esteja sempre sincronizada com o banco de dados, o estado local só é atualizado após a confirmação de sucesso da API, eliminando inconsistências.

## 🛠️ Instalação e Execução

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento localmente.

### Pré-requisitos

Antes de começar, você precisará ter a seguinte ferramenta instalada na sua máquina:

- [Bun](https://bun.sh/) (v1.1.0 ou superior)

> **Importante:** A API de backend deve estar em execução para que o frontend possa se comunicar com ela.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone <url-do-seu-repositorio-frontend>
    cd <nome-da-pasta-do-projeto>
    ```

2.  **Crie o arquivo de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

    ```bash
    cp .env.example .env
    ```

    O arquivo `.env` deve conter a URL base da sua API de backend. O prefixo `VITE_` é **obrigatório** para que o Vite exponha a variável ao frontend.

    **`.env`**

    ```
    VITE_BACKEND_URL=http://localhost:3000
    ```

3.  **Instale as dependências:**

    ```bash
    bun install
    ```

4.  **Inicie a Aplicação em Modo de Desenvolvimento:**
    Este comando iniciará o servidor com Hot Reload.
    ```bash
    bun run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## 🧪 Testes

A aplicação pode ser testada utilizando o executor de testes nativo do Bun.

- Para rodar os testes, execute:

  ```bash
  bun test

  ```
