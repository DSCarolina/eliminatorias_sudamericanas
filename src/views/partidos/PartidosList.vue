<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>
    <div class="row">
        <div class="col-md-6 mb-3">
            <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Filtrar por Selección Local</span>
            <select v-model="filtroSeleccionLocal" id="color" class="form-select" @change="obtenerLista()">
                <option disabled value="">-- Selecciona --</option>
                <option value="">Todos</option>
                <option v-for="seleccion in seleccionesList" :key="id" :value="seleccion.id">
                    {{ seleccion.nombre }}
                </option>
            </select>
        </div>
        </div>
        <div class="col-md-6 mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Estadio</span>
            <input type="search" v-model="textoAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>
    </div>
    <div class="row">
    <div class="col-md-6 mb-3">
            <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Filtrar por Selección Visitante</span>
            <select v-model="filtroSeleccionVisitante" id="color" class="form-select" @change="obtenerLista()">
                <option disabled value="">-- Selecciona --</option>
                <option value="">Todos</option>
                <option v-for="seleccion in seleccionesList" :key="id" :value="seleccion.id">
                    {{ seleccion.nombre }}
                </option>
            </select>
            </div>
        </div>
    <div class="col-md-6 mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Fecha</span>
            <input type="date" v-model="fechaAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>
    </div>
    <div class="table-responsive">
        <!-- <pre>{{ items }}</pre> -->
        <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Estadio</th>
                    <th scope="col">Local</th>
                    <th scope="col">Visitante</th>
                    <th scope="col">Goles local</th>
                    <th scope="col">Goles visitante</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.fecha }}</td>
                    <td>{{ item.estadio }}</td>
                    <td>{{ item.local }} </td>
                    <td>{{ item.visitante }} </td>
                    <td>{{ item.goles_local }}</td>
                    <td>{{ item.goles_visitante }}</td>
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
                    <partidos-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></partidos-crear>
                    <partidos-editar v-if="modalMode === 'editar'" :item="itemSeleccionado"
                        @updated="modificar($event)"></partidos-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import PartidosCrear from './PartidosCrear.vue';
import PartidosEditar from './PartidosEditar.vue';

export default {
    name: 'PartidosList',
    data() {
        return {
            title: 'Partidos',
            items: [],
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
            seleccionesList: [],
            textoAbuscar: '',
            fechaAbuscar: '',
            filtroSeleccionLocal: '',
            filtroSeleccionVisitante: ''
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        PartidosCrear,
        PartidosEditar
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
        // this.obtenerSelecciones();
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
            let filtroLocal = "";
            let filtroVisitante = "";
            if (this.filtroSeleccionLocal !== "") {
                filtroLocal = "&localId=" + this.filtroSeleccionLocal;
            }
            if (this.filtroSeleccionVisitante !== "") {
                filtroVisitante = "&visitanteId=" + this.filtroSeleccionVisitante;
            }
            this.axios.get(process.env.VUE_APP_API_URL + '/partidos?'+ filtroLocal +  filtroVisitante +  '&fecha_like='+this.fechaAbuscar + '&estadio_like=' + this.textoAbuscar)
                .then((response) => {
                    this.items = response.data;
                    this.axios.get(process.env.VUE_APP_API_URL + '/seleccions')
                        .then((response) => {
                            this.seleccionesList = response.data;
                            this.items = this.items.map(p => ({
                            ...p,
                            local: this.seleccionesList.find(s => s.id === p.localId)?.nombre || 'Desconocido',
                            visitante: this.seleccionesList.find(s => s.id === p.visitanteId)?.nombre || 'Desconocido'
                            }));
                            })
                        .catch((error) => {
                            console.error(error);
                        });
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
            this.axios.post(process.env.VUE_APP_API_URL + '/partidos', value)
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
            this.axios.patch(process.env.VUE_APP_API_URL + '/partidos/' + value.id, value)
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
                this.axios.delete(process.env.VUE_APP_API_URL + '/partidos/' + value.id, value)
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

<style lang="scss">
h1 {
color: #083F91;
}
</style>