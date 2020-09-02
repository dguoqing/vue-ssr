<template>
  <div class="select">
    <ul>
      <li v-for="(item,index) in lesson" style="margin-top: 15px;" :key="index">
        <label class="checkbox-label">
          <input v-model="selectArr" @change="onChange" :value="index"  :checked="index == 0" type="checkbox" class="checkbox-input event-allChooseHouse" />
          <span class="checkbox-core"></span>
          <span class="text">{{item.name}}</span>
        </label>
      </li>
    </ul>
    <button @click="deleteData">删除</button>
    <!-- <input type="checkbox" @click="submitData">提交的 -->

    <div class="selectAll" style="margin-top: 15px;">
      <label class="checkbox-label">
        <input type="checkbox" class="checkbox-input event-allChooseHouse" @click="selectAll" value="" >
        <span class="checkbox-core"></span>
        <span class="text">全选</span>
      </label>
    </div>
  </div>
</template>

<script>
  var lesson = [
    {id:'1001',name:'vue'},
    {id:'1002',name:'angurlar'},
    {id:'1003',name:'react'},
    {id:'1004',name:'javascript'},
    {id:'1005',name:'jquery'}
  ];
export default {
  name: '',
  data () {
    return {
      msg: '选择',
      lesson:lesson,
      selectArr: [],
      checkedArr:[],
    }
  },
  methods: {
    selectAll(event) { //全选
      var _this = this;
      console.log(event.currentTarget.checked);
      if (!event.currentTarget.checked) {
        this.selectArr = [];
      } else {         //实现全选
        _this.selectArr = [];
        _this.lesson.forEach(function(item, i) {
          _this.selectArr.push(i);
        });
        console.log(_this.selectArr);
      }
      console.log('>>>>>>>>>>>>>>>>>>>>...')
    },
    deleteData(){ //删除
        var arr = [];
        var len = this.lesson.length;
        for(var i=0;i<len;i++){
            if(this.selectArr.indexOf(i)>=0){
                console.log(this.selectArr.indexOf(i));
            }else {
                console.log('lesson[i]');
                console.log(lesson[i]);
                arr.push(lesson[i]);
            }
        }
        this.lesson = arr;
        this.selectArr = [];
    },
    submitData(){ //提交
        var subArr = [];
        var len = this.lesson.length;
        for(var i= 0;i<len;i++){
            if(this.selectArr.indexOf(i)>=0){
                subArr.push(lesson[i]);
            }
        }
        if(subArr.length==0){
            alert('请勾选后再提交');
        }else {
          console.log('提交的');
          console.log(subArr);
        }
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<',this.selectArr);
    },
    onChange(){
        this.checkedArr = [];
        this.selectArr.map(item=>{
          return this.checkedArr.push(this.lesson[item] ) 
        })
        console.log( this.checkedArr);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*组件 start*/
  .checkbox-label{padding: 0 0.1rem;display: flex;align-items: center;}
  .checkbox-label .checkbox-input{display: none;opacity: 0;}
  .checkbox-label .checkbox-core{
    display: inline-block;
    border-radius: 100%;
    /*background: #e6e7e9;*/
    border:1px solid #c2c2c2;
    position: relative;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .checkbox-core:after {
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    content: "";
    top: 2px;
    left: 8px;
    position: absolute;
    width: 6px;
    height: 12px;
    -webkit-transform: rotate(45deg) scale(0);
    transform: rotate(45deg) scale(0);
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s,-webkit-transform .2s;
  }
  .checkbox-input:checked+.checkbox-core {background-color: #26a2ff;border-color: #26a2ff;}
  .checkbox-input:checked+.checkbox-core:after {border-color: #fff;-webkit-transform: rotate(45deg) scale(1);transform: rotate(45deg) scale(1);}
  /*组件 end*/
</style>