<template>
  <div class="siderBarBox">
    <div class="topBar">
      <div  class="icon">
     <img :src="img" />
      </div>
 
    </div>
  </div>
</template>
<script>
import Logo from "../assets/Images/CCLogo.png"
export default {
  data() {
    return {
      value: null,
      img: Logo,
    };
  },
};
</script>
<style scoped>
p {
  margin: 0;
}

.icon{
  background-color: #444444;
  padding: 8px 0;
}
.siderBarBox{
  background-color: #D9D9D9;
}

@media screen and (max-width:  842px){

}
</style>
