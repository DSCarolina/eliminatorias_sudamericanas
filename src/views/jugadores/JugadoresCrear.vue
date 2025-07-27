<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form @submit.prevent="emitir($event)" novalidate>
            <div class="mb-3">
                <label class="form-label">Nombre *</label>
                <input v-model="item.nombre" type="text" class="form-control" required :class="{ 'is-invalid': bJugador }" />
                <div v-if="!item.nombre" class="invalid-feedback">El valor es requerido.</div>
                <div v-if="item.nombre && bJugador" class="invalid-feedback">Ya existe un jugador con ese nombre.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Posición Jugador*</label>
                <select v-model="item.posicion" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in posicionList" :key="index" :value="value">{{ value }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Selección *</label>
                <select v-model="item.seleccionId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in seleccionesList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'JugadoresCrear',
    data() {
        return {
            title: 'Crear jugador',
            item: {},
            posicionList:[
                "Mediocampista",
                "Portero",
                "Delantero",
                "Defensa",
            ],
            seleccionesList:[],
            jugadoresList:[],
            bJugador: false,
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
        this.obtenerSelecciones();
        this.obtenerJugadores();
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
            if(this.jugadoresList.some(item => item.nombre.toLowerCase() === this.item.nombre.toLowerCase())) {
                this.bJugador = true;
                return;
            }

            // Si es válido, puedes enviar los datos
            this.$emit('created', this.item);
        },
        obtenerSelecciones() {
            this.axios.get(process.env.VUE_APP_API_URL + '/seleccions')
                .then((response) => {
                    this.seleccionesList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
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
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>