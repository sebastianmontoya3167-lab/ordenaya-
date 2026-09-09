// ============================================================
// Lógica de la página del cliente (index.html)
// Se conecta a la colección "pedidos" en Firestore
// ============================================================

const form = document.getElementById("form-pedido");
const mensajeEstado = document.getElementById("mensaje-estado");

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const pedido = {
    nombre: document.getElementById("nombre").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    producto: document.getElementById("producto").value,
    cantidad: Number(document.getElementById("cantidad").value),
    notas: document.getElementById("notas").value.trim(),
    estado: "pendiente",
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    mostrarMensaje("Enviando pedido...", "");
    await db.collection("pedidos").add(pedido);
    mostrarMensaje("✅ ¡Pedido enviado! Te contactaremos pronto.", "exito");
    form.reset();
  } catch (error) {
    console.error("Error al guardar el pedido:", error);
    mostrarMensaje("❌ No se pudo enviar el pedido. Intenta de nuevo.", "error");
  }
});

function mostrarMensaje(texto, tipo) {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = tipo;
}

// -------------------------------------------------------------
// Consultar mis pedidos por número de teléfono
// -------------------------------------------------------------
const btnConsultar = document.getElementById("btn-consultar");
const listaMisPedidos = document.getElementById("lista-mis-pedidos");

btnConsultar.addEventListener("click", async () => {
  const telefono = document.getElementById("telefono-consulta").value.trim();
  listaMisPedidos.innerHTML = "";

  if (!telefono) {
    return;
  }

  try {
    const resultado = await db
      .collection("pedidos")
      .where("telefono", "==", telefono)
      .orderBy("fecha", "desc")
      .get();

    if (resultado.empty) {
      listaMisPedidos.innerHTML = "<li>No se encontraron pedidos con ese teléfono.</li>";
      return;
    }

    resultado.forEach((doc) => {
      const p = doc.data();
      const item = document.createElement("li");
      item.textContent = `${p.producto} (x${p.cantidad}) — Estado: ${p.estado}`;
      listaMisPedidos.appendChild(item);
    });
  } catch (error) {
    console.error("Error al consultar pedidos:", error);
    listaMisPedidos.innerHTML = "<li>Ocurrió un error al consultar. Intenta más tarde.</li>";
  }
});
