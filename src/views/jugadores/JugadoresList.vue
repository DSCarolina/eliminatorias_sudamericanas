<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Buscar por Nombre Jugador</span>
            <input type="search" v-model="textoAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>
    <div class=" col-6 mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Filtrar por Nombre de Selección</span>
            <select v-model="filtroSeleccion" id="color" class="form-select" @change="obtenerLista()">
                <option disabled value="">-- Selecciona --</option>
                <option value="">Todos</option>
                <option v-for="posicion in posicionList" :key="id" :value="posicion">
                    {{ posicion }}
                </option>
            </select>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered border-secondary">
            <thead class="table-dark">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">nombre</th>
                    <th scope="col">posición</th>
                    <th scope="col">selección</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.posicion }}</td>
                    <td>{{ item.seleccion.nombre }}</td>
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
                    <jugadores-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></jugadores-crear>
                    <jugadores-editar v-if="modalMode === 'editar'" :item="itemSeleccionado"
                        @updated="modificar($event)"></jugadores-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import JugadoresCrear from './JugadoresCrear.vue';
import JugadoresEditar from './JugadoresEditar.vue';
export default {
    name: 'JugadoresList',
    data() {
        return {
            title: ' Jugadores',
            items: [],
            textoAbuscar: '',
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
            posicionList:[
                "Mediocampista",
                "Portero",
                "Delantero",
                "Defensa",
            ],
            filtroSeleccion: '',
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        JugadoresCrear,
        JugadoresEditar,
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
                filtro = "&posicion=" + this.filtroSeleccion;
            }
            this.axios.get(process.env.VUE_APP_API_URL + '/jugadors?_expand=seleccion'+ filtro +'&nombre_like=' + this.textoAbuscar)
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
            this.axios.post(process.env.VUE_APP_API_URL + '/jugadors', value)
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
            this.axios.patch(process.env.VUE_APP_API_URL + '/jugadors/' + value.id, value)
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
                this.axios.delete(process.env.VUE_APP_API_URL + '/jugadors/' + value.id, value)
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

<style></style>