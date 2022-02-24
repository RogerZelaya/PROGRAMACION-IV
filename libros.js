Vue.component('lib', {
    data: () => {
        return {
            search: '',
            autor: [],
            lib: {
                show_msg: false,
                action: 0,
                msg: '',
                idLibro: '',
                idautor: '',
                codigo: '',
                titulo: '',
                editorial: '',
                edicion:''
            }
        }
    },
    methods: {
        getReg() {
            this.autor = [];
            if (localStorage.getItem('autor') != null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('autor')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('autor'))[i];
                    if (this.search.length > 0) {
                        if (data.codigo.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || data.idautor.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                            this.autor.push(data);
                        }
                    } else {
                        this.autor.push(data);
                    }
                }
            }
        },
        saveChanges() {
            this.getReg();
            let lib = this.autor || [];
            let action = ['libistrado', 'actualizado', 'eliminado'];
            if (this.lib.action == 0) {
                this.lib.idLibro = getUniqueId('lib_id_');
                lib.push(this.lib);
            }
            else if (this.lib.action == 1) {
                let index = lib.findIndex(lib => lib.idLibro == this.lib.idLibro);
                lib[index] = this.lib;
            }
            else if (this.lib.action == 2) {
                let index = lib.findIndex(lib => lib.idLibro == this.lib.idLibro);
                lib.splice(index, 1);
            }
            localStorage.setItem('autor', JSON.stringify(lib));
            this.lib.show_msg = true;
            this.lib.msg = `Se a ${action[this.lib.action]} correctamente el autor`;
            this.newReg();
            this.getReg();
        },
        showReg(lib) {
            this.lib = JSON.parse(JSON.stringify(lib));
            this.lib.action = 1;
        },
        delReg(lib) {
            if(confirm(`¿Estas seguro de eliminar al autor libistrado ${lib.codigo}?`)) {
                this.lib.action = 2;
                localStorage.removeItem(lib.idLibro);
                this.saveChanges();
            }
        },
        newReg() {
            this.lib = {
                show_msg: false,
                action: 0,
                msg: '',
                idLibro: '',
                idautor: '',
                codigo: '',
                titulo: '',
                editorial: ''
            }
        },
        searchReg(){
            this.getReg(this.search);
            this.autor.filter(lib => {
                if (lib.codigo.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                    return lib;
                }
            });
        }
    },
    created(){
        this.getReg();
    },
    template: `
        <div>
            <form class="max-w-fit mx-auto mb-4" method="post" @submit.prevent="saveChanges" @reset.prevent="newReg">
                <div class="font-semibold bg-blue-200 text-blue-700 py-3 px-6 mb-0 rounded-lg shadow-md flex justify-between">
                    <h1 class="text-xl text-center">Registrar un Libro</h1>
                    <!--button type="button" class="text-blue-500 hover:text-blue-400 px-4 py-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>
                    </button -->
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md flex flex-col">
                    <div class="mb-3">
                        <label class="block text-blue-700 text-sm font-bold mb-2" for="idautor">
                            Id Autor
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="idautor" type="text" placeholder="Id del autor" v-model="lib.idautor">
                    </div>
                    <div class="mb-4">
                        <label class="block text-blue-700 text-sm font-bold mb-2" for="codigo">
                            Codigo
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="codigo" type="text" placeholder="Codigo del autor" v-model="lib.codigo">
                    </div>
                    <div class="mb-4">
                        <label class="block text-blue-700 text-sm font-bold mb-2" for="titulo">
                            Pais
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="titulo" type="text" placeholder="Pais del autor" v-model="lib.titulo">
                    </div>
                    <div class="mb-4">
                        <label class="block text-blue-700 text-sm font-bold mb-2" for="editorial">
                            Telefono
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="editorial" type="text" placeholder="Telefono del autor" v-model="lib.editorial">
                    </div>
                    <div class="flex justify-center items-center" v-if="lib.show_msg">
                        <div class="bg-blue-200 text-blue-700 py-3 px-6 mb-0 rounded-lg shadow-md" v-if="lib.show_msg">
                            <p class="text-center text-blue-700 text-sm">{{lib.msg}}</p>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-4">
                        <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" value="Guardar">
                        <input type="reset" class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" value="Cancelar">
                        <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        </button>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button> -->
                    </div>
                </div>
            </form>
            <table class="table-auto mx-auto overflow-auto max-w-fit">
                <thead>
                    <tr>
                        <th colspan="5" class="px-4 py-2 bg-blue-200 text-blue-700 font-bold">
                            Buscar: <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" v-model="search" @keyup="searchReg">
                        </th>
                    </tr>
                    <tr class="text-center bg-blue-200 text-blue-700">
                        <th class="px-4 py-2 hover:bg-blue-300">Id Autor</th>
                        <th class="px-4 py-2 hover:bg-blue-300">Codigo</th>
                        <th class="px-4 py-2 hover:bg-blue-300">Pais</th>
                        <th class="px-4 py-2 hover:bg-blue-300">Telefono</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lib in autor" @libck="showReg(lib)" :key="lib.idLibro" class="hover:bg-blue-200">
                        <td class="border px-4 py-2">{{ lib.idautor }}</td>
                        <td class="border px-4 py-2">{{ lib.codigo }}</td>
                        <td class="border px-4 py-2">{{ lib.titulo }}</td>
                        <td class="border px-4 py-2">{{ lib.editorial }}</td>
                        <td class="border px-4 py-2">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @libck="delReg(lib)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
});