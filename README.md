
# Api Urna Eletrônica

Sistema simula uma urna eletrônica numa eleição presidencial


## Funcionalidades

- Votação para Presidente.
- Inclusão e remoção de novos candidatos.
- Tela com gráficos para acompanhamento da eleição.


# Documentação da API

## Candidatos

#### Retorna Candidato Pelo Seu Número Eleitoral

```http
  GET /Candidates
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Query` | `int` | **Obrigatório**. Numero Eleitoral do Candidato |


#### Deletar um Candidato

```http
  DELETE/Candidates
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Body`      | `int` | **Obrigatório**. O ID do item que você quer excluir|

#### Adicionar um Candidato

```http
  Post/Candidates
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Body`      | `string` | **Obrigatório**. Preencher os itens|

## Votos

### Retorna todos os votos dos Candidatos

```http
  GET /Votes
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Query` | `bool` | **Obrigatório**. É Classificado? true / false |

```http
  Post/Votes
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Body`      | `string` | **Obrigatório**. Preencher os itens|


## Deploy

Para fazer o deploy desse projeto na pasta raiz execute:

### Api

```bash
  cd ApiUrnaEletronicaBack
  cd ApiUrnaEletronica
  dotnet run
```

### React

```bash
  cd ApiUrnaEletronicaFront
  npm install
  npm start
```


## Stack utilizada

**Front-end:** React, ReactToastify, React Router Dom, Typescript, Chart.js, Node.js

**Back-end:** .NET 6, AspNet Web API, Entity Framewor, Auto Mapper


## Autores

- [@Felipe Muniz](https://www.github.com/FelipeMunizz)

