const express = require("express"); //Inyectamos la dependencia de express
const router = express.Router(); //Generamos la instancia del router
const mongoose = require("mongoose"); //Inyectamos la dependencia de mongoose
let Person = require("../models/persons"); //Y inyectamos la dependencia de Persons del modelo

//Agregamos la ruta /gente por el metodo get, esto debe ser asincrona por lo cual deberia retornar una promesa que se debe de cumplir, le ponemos al persons await para que cargen los datos en segundo plano
/*
router.get("/gente", async (req, res) => {
  const Persons = await Person.find({});
  res.json(Persons);
});
*/

//Aqui simplemente vamos a hacer lo mismo que la ruta anterior, es mas mejor la sobrescribimos pero ahora la renderizamos, obiamente como necesitamos aplicar la funcion asincrona
// encontramos person y lo renderizamos indicandole que es en index y con la informacion de persons la cual la destructuramos con {}
router.get("/gente", async (req, res) => {
  const Persons = await Person.find({});
  res.render("index", { Persons });
});

//Renderiza datos de agregar (crear html-ejs)
router.get("/add", function (req, res) {
  res.render("addItem");
});

//Endpoint POST agregar una persona
router.post("/agregar", async (req, res) => {
  let person = Person({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  });
  person.save().then(() => res.redirect("/gente"));
});
//Agregar endponit para insertar un item en la conexion

////////////////////////////////////////////////////
//Exportamos el ruteador
module.exports = router;
