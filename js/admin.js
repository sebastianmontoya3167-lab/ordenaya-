// ============================================================
// Lógica del panel administrativo (admin.html)
// Lee la colección "pedidos" en tiempo real y permite marcarlos como listos
// ============================================================

const cuerpoTabla = document.getElementById("cuerpo-tabla-pedidos");
const mensajeAdmin = document.getElementById("mensaje-admin");

// onSnapshot escucha cambios en tiempo real: si llega un pedido nuevo,
// la tabla se actualiza sola, sin recargar la página.
db.collection("pedidos")
  .orderBy("fecha", "desc")
  .onSnapshot(
    (snapshot) => {
      cuerpoTabla.innerHTML = "";

      if (snapshot.empty) {
        cuerpoTabla.innerHTML = "<tr><td colspan='7'>No hay pedidos registrados todavía.</td></tr>";
        return;
      }

      snapshot.forEach((doc) => {
        const pedido = doc.data();
        const fila = document.createElement("tr");

        const claseEstado = pedido.estado === "listo" ? "estado-listo" : "estado-pendiente";

        fila.innerHTML = `
          <td>${escapeHTML(pedido.nombre)}</td>
          <td>${escapeHTML(pedido.telefono)}</td>
          <td>${escapeHTML(pedido.producto)}</td>
          <td>${pedido.cantidad}</td>
          <td>${escapeHTML(pedido.notas || "-")}</td>
          <td class="${claseEstado}">${pedido.estado}</td>
          <td></td>
        `;

        const celdaAccion = fila.querySelector("td:last-child");
        if (pedido.estado !== "listo") {
          const boton = document.createElement("button");
          boton.textContent = "Marcar listo";
          boton.className = "btn-mini";
          boton.addEventListener("click", () => marcarComoListo(doc.id));
          celdaAccion.appendChild(boton);
        }

        cuerpoTabla.appendChild(fila);
      });
    },
    (error) => {
      console.error("Error al escuchar pedidos:", error);
      mensajeAdmin.textContent = "❌ No se pudieron cargar los pedidos.";
      mensajeAdmin.className = "error";
    }
  );

async function marcarComoListo(idPedido) {
  try {
    await db.collection("pedidos").doc(idPedido).update({ estado: "listo" });
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    mensajeAdmin.textContent = "❌ No se pudo actualizar el pedido.";
    mensajeAdmin.className = "error";
  }
}

// Evita que texto ingresado por el cliente rompa el HTML de la tabla
function escapeHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}
