<template>
  <div class="MainBox">
    <div class="sidebar">
      <SideBarStatic />
    </div>
    <div class="differentBox">
      <PerformanceBonus />
    </div>
  </div>
</template>
<script>
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import "./index.css";
import InputOtp from "primevue/inputotp";
import SideBarStatic from "./Component/SideBarStatic.vue";
import PerformanceBonus from "./Component/PerformanceBonus.vue";

export default {
  data() {
    return {
      value: null,
    };
  },
  components: {
    Button,
    Checkbox,
    InputOtp,
    SideBarStatic,
    PerformanceBonus,
 
  },
};
</script>
<style scoped>
.MainBox {
  display: flex;
  align-items:stretch;
}
.sidebar {
  width: 20%;
    background-color: #D9D9D9;
}
.differentBox {
  width: 80%;
  padding:20px;
  border-top: 63px solid black;
  border-bottom: 50px solid black;

}
@media screen and (max-width:  842px){
  .differentBox {
  width: 100%;
   border-top: 20px solid black;
  border-bottom: 20px solid black;
}
.sidebar {
  display: none;
}
}


</style>
