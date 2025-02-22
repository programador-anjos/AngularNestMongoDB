# Desafio Tagme

A aplicação consiste em um CRUD (Create, Read, Update, Delete) com o [Nest](https://nestjs.com/) como backend e o [Angular](https://angular.dev/) como frontend,
funcionando juntos em um único repositório e integrados através do [NX](https://nx.dev/).


Campos da aplicação:
- Foto
- Título
- Descrição

Tecnologias utilizadas:
- nx (20.4.6)
- Angular (19.1.0)
- Nest (19.8.4)
- Primeng (19.0.7)
- Primeflex (4.0.0)
- Primeicons (7.0.0)
- mongodb (6.13.1)
- mongoose (8.10.1)


## Comandos:

Executar o Angular:

```sh
(npx) nx serve angular
```

Executar o Nest:

```sh
(npx) nx serve nest
```

Executar o backend fake para APIs JSON:

```sh
json-server db.json --port 3000
```

Arquivo utilizado para o backend fake: db.json
