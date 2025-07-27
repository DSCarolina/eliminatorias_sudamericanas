<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form  @submit.prevent="emitir($event)" novalidate>
            <div class="mb-3">
                <label class="form-label">Fecha *</label>
                <input v-model="item.fecha" type="date" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Estadio *</label>
                <select v-model="item.estadio" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in estadioList" :key="index" :value="value">{{ value }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Selección Local *</label>
                <select v-model="item.localId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in seleccionesList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Selección Visitante *</label>
                <select v-model="item.visitanteId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in seleccionesList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Goles Local *</label>
                <input v-model="item.goles_local" type="number" min="0" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Goles Visitantes *</label>
                <input v-model="item.goles_visitante" type="number" min="0" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            


            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'PartidosCrear',
    data() {
        return {
            title: 'Agregar partido',
            item: {},
            seleccionesList: [],
            estadioList:[
                "Estadio Monumental",
                "Maracaná",
                "Estadio Metropolitano"
            ]
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