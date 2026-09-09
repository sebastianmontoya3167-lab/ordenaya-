<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Panel Admin - OrdenaYa</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="topbar admin">
    <h1>📋 Panel de Pedidos - La Espiga</h1>
    <p>Vista interna para el equipo de la panadería</p>
  </header>

  <main class="container">
    <section class="card">
      <h2>Pedidos pendientes</h2>
      <table id="tabla-pedidos">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Notas</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody id="cuerpo-tabla-pedidos">
          <!-- Se llena dinámicamente con Firestore -->
        </tbody>
      </table>
      <p id="mensaje-admin"></p>
    </section>
  </main>

  <footer>
    <p>Proyecto ABP - Programación para la Web - UCN Medellín</p>
  </footer>

  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
  <script src="js/firebase-config.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
