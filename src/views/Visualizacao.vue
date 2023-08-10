<template>
  <CadastroLayout @ao-salvar="voltar">
    <template #titulo>
      Confirmação de Acesso
    </template>
  
    <v-col class="ml-1">
      <v-row>
        <v-col cols="12" md="12">
          <strong>Tipo de Usuario</strong>
          <p>{{ tipoUsuario }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <strong>Nome</strong>
          <p>{{ form.nome }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <strong>Orgão</strong>
          <p>{{ form.orgao }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <strong>Matricula</strong>
          <p>{{ form.matricula }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <strong>Cargo</strong>
          <p>{{ listarCargos }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <strong>Unidade</strong>
          <p>{{ form.unidade }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <strong>Qual foi o sistema Selecionado para ter acesso</strong>
          <p>{{ form.sistema }}</p>
        </v-col>
      </v-row>
  
    </v-col>
    <v-row>
      <v-card-text>
        <v-card-title>
          Endereço Informado
        </v-card-title>
  
        <v-table>
          <thead>
            <tr>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in form.endereco" :key="item.id">
              <td>{{ item.cep }}</td>
              <td>{{ item.logradouro }}</td>
              <td>{{ item.bairro }}</td>
              <td>{{ item.localidade }}</td>
              <td>{{ item.uf }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-row>
  
      <template #botoesFormulario>
        <v-btn
          class="mr-4"
          color="grey"
          @click="voltar"
        >
          Voltar
        </v-btn>
  
        <v-btn color="primary">
          Salvar
        </v-btn>
      </template>
  </CadastroLayout>
  
  
  
  </template>
  <script>
  import {  computed } from 'vue';
  import CadastroLayout from "@/layouts/default/CadastroLayout.vue"
  import { useUsuarioStore } from '@/stores/store';
  import axios from 'axios';
  
  export default {
    name: "VisualizarFormulario",
    components: {
      CadastroLayout
    },
  
    data() {
      return {
        useUsuarioStore: useUsuarioStore(),
        listarCargos:[],
      }
    },
  
    setup() {
      const { form, tela } = useUsuarioStore();
  
      const tipoUsuario = computed(() => {
        if (typeof tela.tipoUsuario === 'undefined') {
          return;
        }
  
        for (let i = 0; i < tela.tipoUsuario.length; i++) {
          if (tela.tipoUsuario[i].valor === form.tipoUsuario) {
            return tela.tipoUsuario[i].nome;
          }
        }
        return '';
      });
      return {
        tipoUsuario,
        form,
        tela,
      };
    },
  
    mounted() {
      this.carregarCargos()
    },
  
    methods: {
      voltar() {
        this.$router.push("/")
      }, 
  
      carregarCargos() {
        axios.get(`https://homologacao.policiacivil.pa.gov.br/teste-thiago/public/api/cargos/`)
        .then(response => {
          this.listarCargos = response.data;
        })
        .catch(error => {
          console.log('Erro ao buscar os nomes da API:', error);
        });
      },
    },
  
  
    
  };
  
  </script>