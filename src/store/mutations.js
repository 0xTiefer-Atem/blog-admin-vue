
export default {
  //上面的state是自动往这里面的函数里传入的

  updateStaffId(state, payLoad){
    console.log(payLoad);
    state.staffId = payLoad;
    console.log(state.staffId);
  },
  logOutUser(state) {
    state.staffId = ''
  },

  //额外参数叫做payload 载荷
  addCount(state, payLoad) {
    //普通风格操作
    // state.counter += payLoad;

    //特殊风格操作
    state.counter += payLoad.num;
  }
}
