<template>
  <div class="bgTemplate">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
  </div>
</template>

<script>
export default {
    name:'BgTemplate'
}
</script>

<style lang="less" scope>
.bgTemplate{
  // r1
  .r1{
    border-radius: 100%;
    width: 350px;
    height: 350px;
    background-color:rgba(56, 15, 84, 0.2);
    position:fixed;
    left: 150px;
    top: 50px;
    animation: r1 15s infinite;
  }
  // r1的动画
  @keyframes r1 {
    0%{transform: translate(0px,5px);}
    20%{transform: translate(50px,25px);}
    40%{transform: translate(70px,45px);}
    60%{transform: translate(40px,25px);}
    80%{transform: translate(50px,85px);}
    10%{transform: translate(10px,105px);}
  }
// r2
  .r2{
    border-radius: 100%;
    width: 200px;
    height: 200px;
    background-color:rgba(84, 15, 63, 0.2);
    position:fixed;
    left: 1000px;
    top: 50px;
    animation: r2 20s infinite;
  }
  // r2的动画
  @keyframes r2 {
    0%{transform: translate(0px,60);}
    20%{transform: translate(80px,25px);}
    40%{transform: translate(50px,45px);}
    60%{transform: translate(80px,75px);}
    80%{transform: translate(20px,35px);}
    10%{transform: translate(10px,85px);}
  }
// r3
  .r3{
    border-radius: 40%;
    width: 270px;
    height: 270px;
    background-color:rgba(9, 72, 161, 0.2);
    position:fixed;
    left: 800px;
    bottom: 50px;
    animation: r3 10s infinite;
  }
// r3的动画
  @keyframes r3 {
    0% {
        transform: translate(-50%, 0) rotateZ(0deg);
    }
    50% {
        transform: translate(-50%, -2%) rotateZ(180deg);
    }
    100% {
        transform: translate(-50%, 0%) rotateZ(360deg);
    }
  }
  // r4
  .r4{
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color:rgba(218, 74, 26, 0.2);
    position:fixed;
    left: 550px;
    top: 90px;
    animation: r4 10s infinite;
  }
  // r4的动画
  @keyframes r4 {
    0% {
        box-shadow: 0px 0px 10px rgb(14, 90, 148);
        transform: scale(1.1);
    }
    25%{
      box-shadow: 0px 0px 15px rgb(6, 71, 192);
        transform: scale(1.0);
    }
    50% {
        box-shadow: 0px 0px 10px  rgb(30, 0, 255);
        transform: scale(0.9);
    }
    75%{
        box-shadow: 0px 0px 15px rgb(162, 12, 62);
        transform: scale(1.0);
    }
    100% {
        box-shadow: 0px 0px 10px rgb(14, 90, 148);
        transform: scale(1.1);
    }
  }
}

</style>