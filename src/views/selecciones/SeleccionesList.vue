<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Buscar por Técnico</span>
            <input type="search" v-model="textoAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Filtrar por Nombre de Selección</span>
            <select v-model="filtroSeleccion" id="color" class="form-select" @change="obtenerLista()">
                <option disabled value="">-- Selecciona --</option>
                <option value="">Todos</option>
                <option v-for="seleccion in selecciones" :key="marca" :value="seleccion">
                    {{ seleccion }}
                </option>
            </select>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Técnico</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.tecnico }}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" @click="abrirModalParaEditar(item)">
                            <i class="bi bi-pen-fill"></i>
                        </button>
                        &nbsp;
                        <button type="button" class="btn btn-outline-danger" @click="eliminar(item)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal Bootstrap -->
    <div class="modal fade" id="modalAutoEditar" tabindex="-1" aria-labelledby="modalAutoEditarLabel" aria-hidden="true"
        ref="modalRef">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <selecciones-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></selecciones-crear>
                    <selecciones-editar v-if="modalMode === 'editar'" :item="itemSeleccionado"
                        @updated="modificar($event)"></selecciones-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import SeleccionesCrear from './SeleccionesCrear.vue';
import SeleccionesEditar from './SeleccionesEditar.vue';

export default {
    name: 'SeleccionesList',
    data() {
        return {
            title: 'Selecciones',
            items: [],
            textoAbuscar: '',
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
            selecciones: [
                "Ecuador",
                "Brasil",
                "Argentina",
                "Chile",
                "Colombia",
                "Perú",
                "Uruguay",
                "Bolivia",
            ],
            filtroSeleccion: ''
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        SeleccionesCrear,
        SeleccionesEditar
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
        this.$nextTick(() => {
            if (this.$refs.modalRef) {
                this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
            } else {
                console.error('No se encontró el ref modalRef');
            }
        });
        this.obtenerLista();
    },
    updated() {
        // Componente actualizado
    },
    destroyed() {
        // Componente destruido
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.

        obtenerLista() {
            let filtro = "";
            if (this.filtroSeleccion !== "") {
                filtro = "&nombre=" + this.filtroSeleccion;
            }
            this.axios.get(process.env.VUE_APP_API_URL + '/seleccions?'+ filtro + '&tecnico_like=' + this.textoAbuscar)
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        abrirModalParaCrear() {
            this.modalMode = "crear";
            if (this.modalBootstrapInstance) {
                this.modalBootstrapInstance.show();

            } else {
                console.error('modalBootstrapInstance no está inicializado');
            }
        },
        cerrarModal() {
            if (this.modalBootstrapInstance) {
                this.modalBootstrapInstance.hide();
            }
        },
        nuevo(value) {
            this.axios.post(process.env.VUE_APP_API_URL + '/seleccions', value)
                .then((response) => {
                    this.cerrarModal();
                    this.obtenerLista();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        abrirModalParaEditar(item) {
            this.itemSeleccionado = { ...item };
            this.modalMode = "none";
            setTimeout(() => {
                if (this.modalBootstrapInstance) {
                    this.modalBootstrapInstance.show();
                    this.modalMode = "editar";
                } else {
                    console.error('modalBootstrapInstance no está inicializado');
                }
            })
        },
        modificar(value) {
            this.axios.patch(process.env.VUE_APP_API_URL + '/seleccions/' + value.id, value)
                .then((response) => {
                    this.cerrarModal();
                    this.obtenerLista();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        eliminar(value) {
            if (confirm("¿Está seguro de eliminar este ítem?")) {
                this.axios.delete(process.env.VUE_APP_API_URL + '/seleccions/' + value.id, value)
                    .then((response) => {
                        this.obtenerLista();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
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

<style>
h1 {
color: #083F91;
}
</style>