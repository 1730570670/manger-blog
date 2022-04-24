<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
/* 去除浏览器自身边距 */
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app{
  width: 100%;
  height: 100vh;
}
</style>
