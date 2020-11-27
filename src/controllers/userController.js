exports.crearCuenta = async (req, res) => {
  // leer los datos
  const { email, password } = req.body;

  try {
    // crear el usuario
    await Usuarios.create({
      email,
      password,
    });

    // crear una URL de confirmar
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

    // crear el objeto de usuario
    const usuario = {
      email,
    };

    // enviar email
    await enviarEmail.enviar({
      usuario,
      subject: "Confirma tu cuenta UpTask",
      confirmarUrl,
      archivo: "confirmar-cuenta",
    });

    // redirigir al usuario
    req.flash("correcto", "Enviamos un correo, confirma tu cuenta");
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crear Cuenta en Uptask",
      email,
      password,
    });
  }
};
