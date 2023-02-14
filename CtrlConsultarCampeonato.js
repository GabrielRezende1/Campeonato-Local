//COMO SE FOSSE UM MANTER TIMES
const seo = require("./src/seo.json");
const data = require("./src/data.json");
const db = require("./src/" + data.database);

var servidor;

module.exports = {
  configurar: async(srv) => {
    servidor = srv;
    // Apresenta o resultado da votação caso o path seja / e a requisição seja post
    servidor.get("/campeonatos", module.exports.apresentarFormulario);
    
    servidor.post("/campeonatos", module.exports.consultarTimeEspecifico);
  },
  apresentarFormulario: async (request, reply) => {
    // Se a requisição NÃO veio com o parâmetro 'raw', vamos repassar o objeto SEO
    // (Search Engine Optimization) que coloca dados nas tags META do arquivo hbs
    let params = request.query.raw ? {} : { seo: seo };

    // Verificando se ocorreu a autenticação
    let conta = request.cookies.conta;
    let senha = request.cookies.senha;
    console.log("ConsultarCampeonato.js =>" + JSON.stringify(request.cookies));
    if(conta == null || conta == undefined) {
      params.error = "Usuário não autenticado!";
      return reply.view("/src/pages/login.hbs", params);
    }
    
    // Indicamos que queremos ver os resultados.
    params.verTimes = false;
    params.verCampeonatos = true;
    if(senha == 'admin') {
      console.log("RODAPE ADMIN ATIVO");
      params.rodapeUsuario = false;
      params.rodapeAdmin = true;
    }else if(senha == 'usuario') {
      console.log("RODAPE USUARIO ATIVO");
      params.rodapeAdmin = false;
      params.rodapeUsuario = true;
    }
    // Recuperando os campeonatos do banco de dados.
    // Montamos uma lista com os campeonatos e número de times obtidos
    const campeonatos = await db.obterCampeonatos();
    if (campeonatos) {
      params.campeonatos = campeonatos;
    }
    // Se não obteve os campeonatos, repassar a mensagem de erro.
    else params.error = data.msgErro;


    // Se a requisição veio com o parâmetro 'raw', devolvo o JSON com o conteúdo dos times.
    // Se não, solicito a renderização da página index.hbs
    return reply.view("/src/pages/index.hbs", params);
  },
  
  consultarTimeEspecifico: async (request, reply) => {
    // Se a requisição NÃO veio com o parâmetro 'raw', vamos repassar o objeto SEO
    // (Search Engine Optimization) que coloca dados nas tags META do arquivo hbs
    let params = request.query.raw ? {} : { seo: seo };

    // Verificando se ocorreu a autenticação
    let conta = request.cookies.conta;
    if(conta == null || conta == undefined) {
      params.error = "Usuário não autenticado!";
      return reply.view("/src/pages/login.hbs", params);
    }
    
    //Recuperando campeonato específico para especificar no index
    const campEspecifico = await db.obterCampeonatoEspecifico(request.body.idCampeonato);
    if (campEspecifico) {
      request.campEspecifico = campEspecifico;
    }else {
      params.error = data.msgErro;
    }
    
    // Consultando time especifico
    const timesEspecificos = await db.obterTimeEspecifico(request.body.idCampeonato);
    if (timesEspecificos) {
      //params.timesEspecificos = timesEspecificos;
      request.timesEspecificos = timesEspecificos
    }else {
      params.error = data.msgErro;
    }
    
    const ctrlConsultarTime = require("./CtrlConsultarTime.js");
    await ctrlConsultarTime.apresentarTimes(request,reply);

  },
  
};
