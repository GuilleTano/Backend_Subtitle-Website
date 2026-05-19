const controller = {};

controller.index = async (req, res) => {
  try {
    console.log("Servidor corriendo");
    res.send(`<body style="background-color: black;"><h1 style="color: white;">Servidor corriendo</h1></body>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos');
  }
}


export { controller }