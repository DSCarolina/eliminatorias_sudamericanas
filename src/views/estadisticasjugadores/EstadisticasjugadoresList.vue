<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>
    <!-- <pre>{{items}}</pre> -->
     <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Buscar por Nombre Jugador</span>
            <input type="search" v-model="textoAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">jugador</th>
                    <th scope="col">partido</th>
                    <th scope="col">minutos jugados</th>
                    <th scope="col">goles</th>
                    <th scope="col">Tarjetas Amarillas</th>
                    <th scope="col">Tarjetas Rojas</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.jugador.nombre }}</td>
                    <td>{{ item.local }} - {{ item.visitante }} : {{ item.fecha }}</td>
                    <td>{{ item.minutos_jugados }}</td>
                    <td>{{ item.goles }}</td>
                    <td>{{ item.tarjetas_amarillas }}</td>
                    <td>{{ item.tarjetas_rojas }}</td>
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
                    <estadisticas-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></estadisticas-crear>
                    <estadisticas-editar v-if="modalMode === 'editar'" :item="itemSeleccionado"
                        @updated="modificar($event)"></estadisticas-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import EstadisticasCrear from './EstadisticasjugadoresCrear.vue';
import EstadisticasEditar from './EstadisticasjugadoresEditar.vue';

export default {
    name: 'EstadisticasList',
    data() {
        return {
            title: 'Estadisticas',
            items: [],
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
            partidosList: [],
            seleccionesList: [],
            textoAbuscar: '',
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        EstadisticasCrear,
        EstadisticasEditar
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
            Promise.all([
                this.axios.get(process.env.VUE_APP_API_URL + '/estadisticasJugadores?_expand=jugador'),
                this.axios.get(process.env.VUE_APP_API_URL + '/partidos'),
                this.axios.get(process.env.VUE_APP_API_URL + '/seleccions')
                ])
                .then(([estadisticasRes, partidosRes, seleccionesRes]) => {
                this.items = estadisticasRes.data;
                const texto = this.textoAbuscar.toLowerCase() || "";
                    this.items = estadisticasRes.data.filter(item =>
                    item.jugador?.nombre?.toLowerCase().includes(texto)
                    );
                this.partidosList = partidosRes.data;
                this.seleccionesList = seleccionesRes.data;

                // Agregar nombres de local y visitante a cada partido
                this.partidosList = this.partidosList.map(p => ({
                    ...p,
                    local: this.seleccionesList.find(s => s.id === p.localId)?.nombre || 'Desconocido',
                    visitante: this.seleccionesList.find(s => s.id === p.visitanteId)?.nombre || 'Desconocido'
                }));

                // Enlazar nombres de local y visitante a cada estadística
                this.items = this.items.map(est => {
                    const partido = this.partidosList.find(p => p.id === est.partidoId);
                    return {
                    ...est,
                    local: partido?.local || 'Desconocido',
                    visitante: partido?.visitante || 'Desconocido',
                    fecha: partido?.fecha || 'Fecha no disponible',
                    };
                });

  console.log(this.items);
})
.catch(err => console.error(err));

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
            this.axios.post(process.env.VUE_APP_API_URL + '/estadisticasJugadores', value)
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
            this.axios.patch(process.env.VUE_APP_API_URL + '/estadisticasJugadores/' + value.id, value)
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
                this.axios.delete(process.env.VUE_APP_API_URL + '/estadisticasJugadores/' + value.id, value)
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