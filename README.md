# Campeonato-Local

Versão de utilização local do repositório "[Campeonato-AV2](https://github.com/GabrielRezende1/Campeonato-AV2)" utilizando Node.JS. 

Projeto de Login + CRUD seguindo o modelo MVC (Model-View-Controller) simulando um Campeonato de jogos feito ao longo das aulas de Linguagem de Programação Web na FAETERJ-PARACAMBI. 

Várias modificações foram necessárias para torná-lo um app local, além de atualizações de pacotes npm depreciados em relação ao projeto "Campeonato-AV2" feito no Glitch.

# Como utilizar
1. Instale as dependências na pasta de seu projeto
```cmd
npm install
```    

2. Tendo Node.JS instalado, execute o script e abra o link que aparecer no terminal (padrão: http://127.0.0.1:3000)
```cmd
node server.js
```

3. Atualmente o app possui dois logins fixos: um para consultas e outro para alterações, simulando um usuário ou um administrador. Naturalmente o admin possui mais opções no app. Assim:
- O campo "Conta" não possui restrições, é apenas para identificação
- Senha ``usuario`` para simular consultas
- Senha ``admin`` para simular alterações

Dessa forma um cookie será criado para a sessão do seu navegador, bastando navegar pelos links no rodapé da aplicação.

## Dependências

[fastify/cookie@8.3.0](https://www.npmjs.com/package/@fastify/cookie/v/8.3.0)  
[fastify/formbody@7.4.0](https://www.npmjs.com/package/@fastify/formbody/v/7.4.0)  
[fastify/static@6.9.0](https://www.npmjs.com/package/@fastify/static/v/6.9.0)  
[fastify/view@7.4.1](https://www.npmjs.com/package/@fastify/view/v/7.4.1)  
[dotenv@16.0.3](https://www.npmjs.com/package/dotenv/v/16.0.3)  
[fastify@4.13.0](https://www.npmjs.com/package/fastify/v/4.13.0)  
[handlebars@4.7.7](https://www.npmjs.com/package/handlebars)   
[sqlite@4.1.2](https://www.npmjs.com/package/sqlite/v/4.1.2)  
[sqlite3@5.1.4](https://www.npmjs.com/package/sqlite3/v/5.1.4)  

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

