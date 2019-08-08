<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="brands"
            :pagination.sync="pagination"
            :total-items="totalBrands"
            :loading="loading"
            class="elevation-1"
        >
            <template
                slot="items"
                slot-scope="props"
            >
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">
                    <img
                        v-if="props.item.image"
                        :src="props.item.image"
                        width="130"
                        height="40"
                    >
                    <span v-else>无</span>
                </td>
                <td class="text-xs-center">{{ props.item.letter }}</td>
                <td class="justify-center layout px-0">
                    <v-btn
                        icon
                        @click="editBrand(props.item)"
                    >
                        <i class="el-icon-edit" />
                    </v-btn>
                    <v-btn
                        icon
                        @click="deleteBrand(props.item)"
                    >
                        <i class="el-icon-delete" />
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { queryList } from "@/api/CRUD";

export default {
  data() {
      return {
        headers:[
          {text: 'id', align: 'center', value: 'id'},
          {text: '名称', align: 'center', sortable: false, value: 'name'},
          {text: 'LOGO', align: 'center', sortable: false, value: 'image'},
          {text: '首字母', align: 'center', value: 'letter', sortable: true,},
          {text: '操作', align: 'center', value: 'id', sortable: false}
        ],
        brands:[],
        totalBrands:0,
        pagination:{},
        loading:true
      }
    },
    created(){
      this.getDataFromServer();
    },
    mounted(){

    },
    methods:{
      getDataFromServer(){
        queryList({
          page: this.pagination.page,// 当前页
          rows: this.pagination.rowsPerPage,// 每页大小
        }).then(resp => { // 这里使用箭头函数
          this.brands = resp.data.items;
          this.totalBrands = resp.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        })
      }
    }
}
</script>

<style>
</style>
