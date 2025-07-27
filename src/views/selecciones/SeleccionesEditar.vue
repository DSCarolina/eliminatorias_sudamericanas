<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form  @submit.prevent="emitir($event)" novalidate>
            
            <div class="mb-3">
                <label class="form-label">Nombre Selección *</label>
                <input v-model="itemLocal.nombre" type="text" class="form-control" required :class="{ 'is-invalid': bSeleccion }"/>
                <div v-if="!itemLocal.nombre" class="invalid-feedback">El valor es requerido.</div>
                <div v-if="itemLocal.nombre && bSeleccion" class="invalid-feedback">Ya existe una selección con ese nombre.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Técnico *</label>
                <input v-model="itemLocal.tecnico" type="text" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'SeleccionesEditar',
    data() {
        return {
            title: 'Editar Selección',
            itemLocal: { ...this.item },
            seleccionesList: [],
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
            this.$emit('updated', this.itemLocal);
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
        item: {
            type: Object,
            required: true
        }
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>