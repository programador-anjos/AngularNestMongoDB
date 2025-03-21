# Desafio Tagme

O projeto consiste em um CRUD (Create, Read, Update, Delete) com o [Nest](https://nestjs.com/) como backend e o [Angular](https://angular.dev/) como frontend,
funcionando juntos em um único repositório, integrados através do [NX](https://nx.dev/).

Campos da aplicação:
- Foto
- Título
- Descrição

## Tecnologias utilizadas:
- NX (20.4.6)
- Angular (19.1.0)
- Nest (19.8.4)
- Primeng (19.0.7)
- Primeflex (4.0.0)
- Primeicons (7.0.0)
- Mongodb (6.13.1)
- Mongoose (8.10.1)

## Comandos:

Executar o Angular:

```sh
nx serve angular
```

Executar o Nest:

```sh
nx serve nest
```

Executar o backend fake para APIs JSON: (db.json)

```sh
json-server db.json --port 3000
```

## Observações:
OBS¹: O upload da imagem é feito automaticamente para a plataforma [imgbb](https://imgbb.com/),
que devolve na requisição a URL da imagem, que será persistida no banco.

OBS²: O sistema se integra de forma remota ao banco [mongodb](https://www.mongodb.com/),
utilizando a biblioteca [Mongoose](https://mongoosejs.com/).
