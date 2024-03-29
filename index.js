const { Client } = require('pg');
require("dotenv").config();

const express = require("express");
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.get("/", (req,res) => {
    res.redirect("/usuarios/novo")
})

app.get("/usuarios/novo", (req,res) => {
    res.sendFile(`${__dirname}/views/novo-usuario.html`)
});

app.post("/usuarios/novo" , (req,res) => {
    const nickname = req.body.nickname;
    const nome = req.body.nome;

    client.query(`INSERT INTO usuarios (usuario_nickname, usuario_nome) 
    VALUES ('${nickname}', '${nome}') returning *`, 
    (err,result) => {
        if(err){
            res.send("Erro: " + err);
        }else{
            res.send("Sucesso, veja os dados: " + JSON.stringify(result.rows));
        }
    });
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000.")
});

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
    //exibeUsuariosCadastrados()//
})
.catch((err)=>{
    console.log(`Erro: ${err}`)
});

// function fechaConexao(){
//     client
//     .end()
//     .then(() => {
//         console.log("Conexão encerrada!");
//     })
//     .catch((err) => {
//         console.error("Erro ao encerrar conexão: " + err)
//     })
// }

// function exibeUsuariosCadastrados(){
//     client.query("SELECT * FROM usuarios", (err,result) => {
//         if(err){
//             console.error("Erro ao executar a busca: " + err);
//         } else {
//             console.log("Resultado : " + JSON.stringify(result.rows));
//         }
//         fechaConexao()
//     });
// }
