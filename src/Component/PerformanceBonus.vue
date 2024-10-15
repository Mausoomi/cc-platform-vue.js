<template>
  <div class="topBox">
    <div>
      <p class="hd">Performance Bonus</p>
    </div>
    <div class="tableConatiner">
      <div class="sctDate">
         <p class="dateRang">Select thr Date Range</p>
        <div class="flex-auto">
         <Calendar
            v-model="icondisplay"
            showIcon
            iconDisplay="input"
            inputId="icondisplay"
          />
          <Calendar
            v-model="icondisplay"
            showIcon
            iconDisplay="input"
            inputId="icondisplay"
          />
        </div>
      </div>

      <div class="card">
        <TreeTable :value="nodes">
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            :expander="col.expander"
          ></Column>
        </TreeTable>
      </div>
    </div>
  </div>
</template>
<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";

import Calendar from "primevue/calendar";
import { ref } from "vue";

const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();
export default {
  data() {
    return {
      // Define static dummy data for the table
      nodes: [
        {
          key: "0",
          data: {
            name: "Documents",
            size: "75kb",
            type: "Folder",
          },
          children: [
            {
              key: "0-0",
              data: {
                name: "Work",
                size: "55kb",
                type: "Folder",
              },
              children: [
                {
                  key: "0-0-0",
                  data: {
                    name: "Report.doc",
                    size: "30kb",
                    type: "Document",
                  },
                },
                {
                  key: "0-0-1",
                  data: {
                    name: "Presentation.ppt",
                    size: "25kb",
                    type: "Document",
                  },
                },
              ],
            },
            {
              key: "0-1",
              data: {
                name: "Home",
                size: "20kb",
                type: "Folder",
              },
              children: [
                {
                  key: "0-1-0",
                  data: {
                    name: "Invoice.pdf",
                    size: "20kb",
                    type: "Document",
                  },
                },
              ],
            },
          ],
        },
        {
          key: "1",
          data: {
            name: "Pictures",
            size: "150kb",
            type: "Folder",
          },
          children: [
            {
              key: "1-0",
              data: {
                name: "Vacation",
                size: "100kb",
                type: "Folder",
              },
              children: [
                {
                  key: "1-0-0",
                  data: {
                    name: "Beach.png",
                    size: "50kb",
                    type: "Image",
                  },
                },
                {
                  key: "1-0-1",
                  data: {
                    name: "Mountain.jpg",
                    size: "50kb",
                    type: "Image",
                  },
                },
              ],
            },
            {
              key: "1-1",
              data: {
                name: "Family.png",
                size: "50kb",
                type: "Image",
              },
            },
          ],
        },
      ],
      columns: [
        { field: "name", header: "Name", expander: true },
        { field: "size", header: "Size" },
        { field: "type", header: "Type" },
      ],
    };
  },
  components: {
    TreeTable,
    Column,
    Calendar,
  },
};
</script>
<style scoped>
.topBox {
  border-top: 63px solid black;
  border-bottom: 63px solid black;
}
.hd{
  background-color: #ecf0f5;
  padding: 15px;
}
.tableConatiner {
  padding: 15px;
}
.dateRang{
    font-weight: 600;
    padding: 10px 0;
}
.sctDate{
    padding: 10px 0;
}
</style>
