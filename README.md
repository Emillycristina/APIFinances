




## APIFinances


Esta API foi desenvolvida em Node.js com Express e oferece funcionalidades para gerenciar movimentações financeiras de usuários em um sistema de finanças pessoais.

## Funcionalidades

1. Autenticação de usuários via JWT (JSON Web Tokens)
2. Inserção de movimentações financeiras (receitas e despesas)
3. Upload de arquivos (por exemplo, recibos) usando Multer
5. Envio de e-mails para confirmações e notificações utilizando Nodemailer
6. Criptografia de senhas utilizando Bcrypt

## Requisitos

Node.js
npm (Node Package Manager)


## Clone este repositório:
```
Copy code
git clone https://github.com/seu-usuario/api-financeira.git

```
## Instale as dependências:
```
cd APIFinanceira
npm install
```
## Execute as migrações do Sequelize:

```
npx sequelize-cli db:migrate`
```


## Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

```

PORT=3000
JWT_SECRET=seuSegredoJWT
DB_URI=URLdoSeuBancoDeDados
EMAIL_USER=seuEmail
EMAIL_PASS=suaSenha
```
Substitua os valores conforme necessário.

Execute a aplicação em modo desenvolvedor:
```
npm run dev
A API estará disponível em http://localhost:3030.
```

## Rotas

Autenticação

POST /auth/register: Registrar um novo usuário
POST /auth/login: Efetuar login e obter token JWT

## Movimentações Financeiras

GET /transactions: Obter todas as movimentações do usuário autenticado

POST /transactions: Adicionar uma nova movimentação financeira

DELETE /transactions/:id: Excluir uma movimentação específica pelo ID

## Upload de Arquivos
POST /upload: Fazer upload de um arquivo (por exemplo, um recibo)

## Exemplos de Uso

## Registro de Usuário


```
POST /auth/register
Content-Type: application/json

{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "password": "senha123"
}

```

## Login

```

POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

## Adicionar Movimentação Financeira

```
POST /transactions
Content-Type: application/json
Authorization: Bearer SeuTokenJWT

{
  "type": "receita",
  "description": "Salário",
  "amount": 2500.00
}
```
Lembre-se de substituir SeuTokenJWT pelo token obtido no login.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues.

## Autores

Emilly Cristina

## Licença

Este projeto está licenciado sob a MIT License.

