const { Client } = require('pg');
require("dotenv").config();

const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
});

client.connect()
.then(() => {
    console.log("Conectado ao banco de dados PostgresSQL");
    exibeUsuariosCadastrados()
})
.catch((err)=>{
    console.log(`Erro: ${err}`)
});

function fechaConexao(){
    client
    .end()
    .then(() => {
        console.log("Conexão encerrada!");
    })
    .catch((err) => {
        console.error("Erro ao encerrar conexão: " + err)
    })
}

function exibeUsuariosCadastrados(){
    client.query("SELECT * FROM usuarios", (err,result) => {
        if(err){
            console.error("Erro ao executar a busca: " + err);
        } else {
            console.log("Resultado : " + JSON.stringify(result.rows));
        }
        fechaConexao()
    });
}
