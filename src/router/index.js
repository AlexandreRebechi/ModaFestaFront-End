import Vue from 'vue'
import Router from 'vue-router'

import login from  '../components/Login'
import home from  '@/components/Home'
import cadastro from '@/components/Cadastro'
import listClientes from '../components/cliente/List.vue'
import editCliente  from  '@/components/cliente/Edit'
import novoCliente from  '@/components/cliente/Add'
import novoCliente2 from '@/components/cliente/Add2'
import listFuncionarios from '@/components/funcionario/List'
import editFuncionario from '@/components/funcionario/Edit'
import novoFuncionario from '@/components/funcionario/Add'
import listperfil from '@/components/perfil/List'
import editPerfil from '@/components/perfil/Edit'
import novoPerfil from '@/components/perfil/Add'
import listFuncionalidades from '@/components/funcionalidade/List'
import editFuncionalidade from '@/components/funcionalidade/Edit'
import novoFuncionalidade from '@/components/funcionalidade/Add'
import listReservas from '@/components/reserva/List'
import listReservas2 from '@/components/reserva/List2'
import editReserva from '@/components/reserva/Edit'
import editReserva2 from '@/components/reserva/Edit2'
import novoReserva from '@/components/reserva/Add'
import novoReserva2 from '@/components/reserva/Add2'
import listProdutos from '@/components/produto/List'
import editProduto from '@/components/produto/Edit'
import novoProduto from '@/components/produto/Add'
import listFotos from '@/components/foto/List'
import editFoto from '@/components/foto/Edit'
import novoFoto from '@/components/foto/Add'
import listTiposProdutos from '@/components/tiposproduto/List' 
import editTiposProduto from '@/components/tiposproduto/Edit'
import novoTiposProduto from '@/components/tiposproduto/Add' 
import listLocacoes from '@/components/locacao/List'
import listLocacoes2 from '../components/locacao/List2.vue'
import editLocacao from '@/components/locacao/Edit'
import novoLocacao from '@/components/locacao/Add'
import listAcompanhamentos from '@/components/acompanhamento/List'
import editAcompanhamento from '@/components/acompanhamento/Edit'
import novoAcompanhamento from '@/components/acompanhamento/Add'
import listSituacoes from '@/components/situacao/List'
import editSituacao from '@/components/situacao/Edit'
import novoSituacao from '@/components/situacao/Add'
import listParcelamentos from '@/components/parcelamento/List'
import editParcelamento from '@/components/parcelamento/Edit'
import novoParcelamento from '@/components/parcelamento/Add'


Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/clientes',
      name: 'clientes-list',
      component: listClientes    
    },
    
    {
      path: '/cliente/:cpf',
      name: "cliente-edit",
      component: editCliente
    },
    {
      path: '/addcliente1',
      name: "cliente-add",
      component: novoCliente
    },
    {
      path: '/addcliente2',
      name: "cliente2-add",
      component: novoCliente2
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: cadastro
    },
    {
      path: '/funcionarios',
      name: 'funcionarios-list',
      component: listFuncionarios  
    },
  
    {
      path: '/funcionario/:cpf',
      name: 'funcionario-edit',
      component: editFuncionario  
    },
    {
      path: '/addfuncionario',
      name: 'funcionario-add',
      component: novoFuncionario  
    },
    {
      path: '/perfis',
      name: 'perfis-list',
      component: listperfil
    },
    {
      path: '/perfil/:id',
      name: 'perfil-edit',
      component: editPerfil
    },
    {
      path: '/addperfil',
      name: 'perfil-add',
      component: novoPerfil
    },
    {
      path: '/funcionalidades',
      name: 'funcionalidades-list',
      component: listFuncionalidades
    },
    {
      path: '/funcionalidade/:id',
      name: 'funcinalidade-edit',
      component: editFuncionalidade
    },
    {
      path: '/addfuncinalidade',
      name: 'funcinalidade-add',
      component: novoFuncionalidade
    },
    {
      path: '/reservas',
      name: 'reservas-list',
      component: listReservas
    },
    {
      path: '/reservabycliente/:cpf',
      name: 'reservas-list2',
      component: listReservas2
    },
    {
      path: '/reserva/:id',
      name: 'reserva-edit',
      component: editReserva
    },
    {
      path: '/reserva2/:id',
      name: 'reserva-edit2',
      component: editReserva2
    },
    {
      path: '/addreserva',
      name: 'reserva-add',
      component: novoReserva

    },
    {
      path: '/addreserva2',
      name: 'reserva-add2',
      component: novoReserva2

    },
    {
      path: '/produtos',
      name: 'produtos-list',
      component: listProdutos
    },
    {
      path: '/produto/:id',
      name: 'produto-edit',
      component: editProduto
    },
    {
      path: '/addproduto',
      name: 'produto-add',
      component: novoProduto
    },
    {
      path: '/fotos',
      name: 'fotos-list',
      component: listFotos
    },
    {
      path: '/foto/:id',
      name: 'foto-edit',
      component: editFoto
    },
    {
      path: '/addfoto',
      name: 'foto-add',
      component: novoFoto
    },
    {
      path: '/tiposprodutos',
      name: 'tiposprodutos-list',
      component: listTiposProdutos
    },
    {
      path: '/tiposproduto/:id',
      name: 'tiposproduto-edit',
      component: editTiposProduto
    },
    {
      path: '/addtiposproduto',
      name: 'tiposproduto-add',
      component: novoTiposProduto
    },
    {
      path: '/locacoes',
      name: 'locacoes-list',
      component: listLocacoes
    },
    {
      path: '/minhaslocacoes/:cpf',
      name: 'locacoes-list2',
      component: listLocacoes2
    },
    {
      path: '/locacao/:id',
      name: 'locacao-edit',
      component: editLocacao
    },
    {
      path: '/addlocacao',
      name: 'locacao-add',
      component: novoLocacao
    },
    {
      path: '/acompanhamentosbylocacao',
      name: 'acompanhamento-list',
      component: listAcompanhamentos
    },
    {
      path: '/acompanhamento/:id',
      name: 'acompanhamento-edit',
      component: editAcompanhamento
      
    },
    {
      path: '/addacompanhamento',
      name: 'acompanhamento-add',
      component: novoAcompanhamento
    },
    {
      path: '/situacoes',
      name: 'situacoes-list',
      component: listSituacoes
    },
    {
      path: '/situacao/:id',
      name: 'situacao-edit',
      component: editSituacao
    },
    {
      path: '/addsituacao',
      name: 'situacao-add',
      component: novoSituacao
    },
    {
      path: '/parcelamentos',
      name: 'parcelamentos-list',
      component: listParcelamentos
    },
    {
      path: '/parcelamento/:id',
      name: 'parcelamento-edit',
      component: editParcelamento
    },
    {
      path: '/addparcelamento',
      name: 'parcelamento-add',
      component: novoParcelamento
    }


  
  ]
})

/*router.beforeEach((to, from, next) => {
    
  if (to.name !== 'home' && !localStorage.getItem('authUser')){
     next({name: 'home'})
  } else {
     next()
  }
  
})*/

export default router;