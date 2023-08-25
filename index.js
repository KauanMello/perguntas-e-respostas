const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./dao/database");
const PerguntaModel = require("./dao/PerguntaModel");
const RespostaModel = require("./dao/RespostaModel")

connection.authenticate().then(()=>{
        console.log("Conexão estabelecida");
    }).catch((msgErro) => {
        console.log(msgErro);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (request, response) {
    PerguntaModel.findAll({ raw: true, order:[
        ['titulo','asc']
    ] }).then((perguntas => {
        response.render("index", {
            perguntas: perguntas
        });
    }));
});

app.get("/perguntar", (request, response) => {
    response.render("perguntar");
});

app.post("/salvar", (request, response) => {
    PerguntaModel.create({
        titulo: request.body.titulo,
        descricao: request.body.descricao
    }).then(() => {
        response.redirect("/");
    });
});

app.get("/pergunta/:id", (request, response) =>{
    var id = request.params.id;

    PerguntaModel.findOne({
        where: { id: id }}).then((pergunta) => {
            if (pergunta != undefined) {
                RespostaModel.findAll({
                    where: {
                        perguntaId: pergunta.id,
                    },
                    order: [[
                            "id",
                            "desc"
                        ]]
                }).then(respostas => {
                    response.render("show_pergunta", {
                        pergunta: pergunta,
                        respostas: respostas
                    })
                })
            }else{
                response.redirect("/");
            }
    }) ;
});

app.post("/responder", (request, response) => {
    var corpo = request.body.corpo;
    var idPergunta = request.body.perguntaIdTela;
    RespostaModel.create({
        corpo: corpo,
        perguntaId: idPergunta
    }).then(() => {
        response.redirect("pergunta/" + idPergunta)
    });

});


app.listen(8080, () => {
    console.log("App iniciado");
});
