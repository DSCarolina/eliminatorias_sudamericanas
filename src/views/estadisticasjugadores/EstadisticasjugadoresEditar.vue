<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form @submit.prevent="emitir($event)" novalidate>

            <div class="mb-3">
                <label class="form-label">Jugador *</label>
                <select v-model="itemLocal.jugadorId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in jugadoresList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Partido *</label>
                <select v-model="itemLocal.partidoId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in partidosList" :key="index" :value="value.id">{{ value.local }} - {{ value.visitante }} - {{ value.fecha }} 
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            <div class="row">
             <div class="col-md-6 mb-3">
                <label class="form-label">Minutos Jugados *</label>
                <input v-model="itemLocal.minutos_jugados" type="number" min="0" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Goles *</label>
                <input v-model="itemLocal.goles" type="number" min="0" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Tarjetas Amarillas *</label>
                <input v-model="itemLocal.tarjetas_amarillas" type="number" min="0" max="2" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Tarjetas Rojas *</label>
                <input v-model="itemLocal.tarjetas_rojas" type="number" min="0" max="1" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            </div>


            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'VacunasEditar',
    data() {
        return {
            title: 'Editar vacuna',
            itemLocal: { ...this.item },
            jugadoresList: [],
            partidosList: [],
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
        this.obtenerJugadores();
        this.obtenerPartidos();
    },
    updated() {
        // Componente actualizado
    },
    destroyed() {
        // Componente destruido
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        emitir(event) {
            const form = event.target;

            // Si no es válido, muestra los errores con Bootstrap
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Si es válido, puedes enviar los datos
            this.$emit('updated', this.itemLocal);
        },
        obtenerJugadores() {
            this.axios.get(process.env.VUE_APP_API_URL + '/jugadors')
                .then((response) => {
                    this.jugadoresList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        obtenerPartidos() {
            this.axios.get(process.env.VUE_APP_API_URL + '/partidos')
                .then((response) => {
                    this.partidosList = response.data;
                    this.axios.get(process.env.VUE_APP_API_URL + '/seleccions')
                        .then((response) => {
                            this.seleccionesList = response.data;
                            this.partidosList = this.partidosList.map(p => ({
                            ...p,
                            local: this.seleccionesList.find(s => s.id === p.localId)?.nombre || 'Desconocido',
                            visitante: this.seleccionesList.find(s => s.id === p.visitanteId)?.nombre || 'Desconocido',
                            }));
                            })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
        // propiedades que el componente puede recibir.
        item: {
            type: Object,
            required: true
        }
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>