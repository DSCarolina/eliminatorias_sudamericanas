<template>
  <section class="hero">
    <h2>Eliminatorias Sudamericanas 2025</h2>
    <p>Clasificación de la Conmebol para la Copa Mundial de Fútbol (o simplemente eliminatorias sudamericanas).</p>
  </section>

  <section id="servicios">
    <!-- <h3>Nuestros Servicios</h3> -->
    <div class="servicios">
      <div class="servicio">
        <h4>Nuestra Misión</h4>
        <p>SUPERACIÓN» – seamos nuestra mejor versión.
Soñemos en grande, como sociedad y como individuos.</p>
      </div>
      <div class="servicio">
        <h4>Nuestra Visión</h4>
        <p>Liderar el entretenimiento del deporte en Sudamérica y reposicionar el fútbol sudamericano como el mejor fútbol del mundo.</p>
      </div>
      <div class="servicio">
        <h4>Nuestros valores</h4>
          <p>1. Confianza (justa, responsable, integradora, transparente)</p>
          <p>2. Liderazgo</p>
          <p>3. Inspiración</p>
          <p>4. Pasión</p>
          <p>5. Solidaridad</p>
      </div>
    </div>
  </section>

  <section id="nosotros">
    <h3>Sobre las eliminaciones sudamericanas</h3>
    <p style="max-width: 700px; margin: auto; text-align: center;">
      Torneo internacional disputado por las selecciones nacionales masculinas miembros de la Confederación Sudamericana de Fútbol (Conmebol), la que organiza la competición
    </p>
  </section>

</template>

<script>

</script>

<style>
.servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.servicio {
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.servicio h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}
.servicio p {
  margin: 0;
}

.hero {
  background-image: url('https://assets1.afa.com.ar/torneo/Dani/Genericas/Conmebol.jpg');
  background-size: cover;
  background-position: top;
  color: var(--white);
  padding: 6rem 2rem;
  text-align: center;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color:white;
}

.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: auto;
  color:white;
}

section {
  padding: 4rem 2rem;
  margin: auto;
}

section h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--secondary);
}

h1 a {
  text-decoration: none;
}
</style>