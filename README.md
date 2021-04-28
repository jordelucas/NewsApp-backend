# NewsApp - Plataforma de Notícias

<p align="center">
  <a target="_blank" href="https://nodejs.org/en/">
      <img alt="NextJS" src="https://img.shields.io/static/v1?color=green&label=Node&message=JS&?style=for-the-badge&logo=Node.js">
  </a>
  <a target="_blank" href="https://www.typescriptlang.org">
    <img alt="ReactJS" src="https://img.shields.io/static/v1?color=blue&label=Typescript&message=JS&?style=for-the-badge&logo=Typescript"> 
  </a>
  </a>
</p>

<p align="center">
API RESTFULL em desenvolvimento para auxiliar o projeto final da disciplina de Desenvolvimento para Dispositivos Móveis, do Bacharelado em Tecnologia da Informação - IMD/UFRN.
</p>


:man_teacher: [**@nelson-ion**](https://github.com/nelson-ion) | :man_teacher: [**@ramonfontes**](https://github.com/ramonfontes) | :man_technologist: [**@jordelucas**](https://github.com/jordelucas)

## :rocket: Como executar

Clone o projeto e acesse a pasta

```bash
$ git clone https://github.com/jordelucas/NewsApp-backend.git && cd NewsApp-backend
```

Siga os passos abaixo
```bash
# Instale as dependências
$ yarn

# Inicie o projeto
$ yarn dev

# O servidor irá iniciar na porta  3333 - vá para http://localhost:3333
```

## :book: Estórias do usuário: 

Membro da comunidade:

* 
  * 
  * 
  * 

Autor da notícia:

* 
  * 
  * 
  * 

## :ballot_box_with_check: Endpoints ##

**[POST]**    `/users` - Cadastra um novo usuário. {name, email, password, permission}

**[POST]**    `/authentication` - Verifica se o usuário tem cadastro. {email, password}

**[POST]**    `/invitation` - Criar um novo convite - {user_id}

**[GET]**     `/invitation/:id` - Verifica se o convite está ativo

**[POST]**    `/news` - Cadastra uma nova notícia - {title, description, user_id}

**[GET]**     `/news` - Lista todas as notícias que o usuário ainda não leu - {user_id}

**[GET]**     `/news/:id` - Mostrar uma notícia 

**[POST]**    `/read` - Registra leitura
