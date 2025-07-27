<template>
  <header>
    <h1> <router-link to="/">Eliminatorios Sudamericanas</router-link></h1>
    <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/selecciones">Selecciones</router-link> |
    <router-link to="/jugadores">Jugadores</router-link> |
    <router-link to="/partidos">Partidos</router-link> |
    <router-link to="/estjugadores">Estadísticas</router-link>
      
    </nav>

  </header>

  <div class="contenedor-principal">

    <router-view />
  </div>

  <footer>
    <p>&copy; 2025 Eliminatorias Sudamericanas. Todos los derechos reservados.</p>
  </footer>

</template>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f4f4;
  color: #2c3e50;
  line-height: 1.6;
}

header {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

header h1 a {
  font-size: 1.5rem;
  color: #083F91;
  font-weight: bold
  ;
}

nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #083F91;
  font-weight: 600;
}

footer {
  background-color: #083F91;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

.contenedor-principal {
  padding: 30px 20px;
  min-height: 100vh;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav a {
    margin: 0.5rem 0 0 0;
  }

  .hero h2 {
    font-size: 2rem;
  }

  .contenedor-principal {
    padding: 20px 10px;
  }
}
</style>
