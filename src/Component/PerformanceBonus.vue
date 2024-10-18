<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="customers"
      paginator
      showGridlines
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="['full-name', 'title', 'created_at']"
    >
      <h1>Bitrix User</h1>
      <template #header>
        <div class="headerTable">
          <div>
            Show
            <Dropdown
              v-model="selectedNum"
              :options="Numbers"
              optionLabel="num"
              placeholder="Select"
              class="w-full md:w-14rem"
            />
            entries
          </div>
          <div class="flex justify-content-between gap-4">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              class="custom-clear-btn"
              outlined
              @click="clearFilter()"
            />
            <IconField iconPosition="left">
              <!-- <InputIcon>
              <i class="pi pi-search" />
            </InputIcon> -->
              <InputText
                v-model="filters['global'].value"
                placeholder=" Search"
              />
            </IconField>
          </div>
        </div>
      </template>

      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>

      <Column field="avatar-url" header="Picture" style="min-width: 12rem">
        <template #body="{ data }">
          <img
            :alt="data['first-name']"
            :src="data['avatar-url']"
            style="width: 35px; height: 35px; border-radius: 50%"
          />
        </template>
      </Column>

      <Column field="full-name" sortable header="Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data["first-name"] + " " + data["last-name"] }}
          <!-- Combine first and last name -->
        </template>
      </Column>

      <Column header="Position" sortable field="title" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.title }}
        </template>
      </Column>

      <Column header="Comission" field="comission" style="min-width: 8rem">
        <template #body="{ data }">
          <InputText type="text" v-model="data.comission" style="max-width: 4rem"/>
        </template>
      </Column>
      <Column header="Bonus" field="bonus" style="min-width: 8rem">
        <template #body="{ data }">
          <InputText type="text" v-model="data.bonus"  style="max-width: 4rem"/>
        </template>
      </Column>
      <!-- Action Column with Export Button -->
      <Column header="Action" style="min-width: 8rem">
        <template #body="{ data }">
          <Button
            icon="pi pi-file-export"
            class="p-button-rounded p-button-success"
            @click="exportRowAsCSV(data)"
            style="
              background-color: #d9d9d9;
              border-color: #d9d9d9;
              color: black;
            "
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import apiClient from "@/axios";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import IconField from "primevue/iconfield";

import Dropdown from "primevue/dropdown";

export default {
  components: {
    DataTable,
    Column,
    Button,
    InputText,
    Dropdown,
  },
  setup() {
    const customers = ref([]);
    const filters = ref({});
    const loading = ref(true);
    const selectedNum = ref();
    const Numbers = ref([{ num: "50" }, { num: "100" }, { num: "150" }]);
    // Initialize filters
    const initFilters = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    };

    // Fetch data from the API on mount
    onMounted(async () => {
      try {
        const apiToken =
          "HSwljzbFAR0WzVFuDvOZZ9HTQB44Qdw2kVVPTjU7aeEJ9mW2DEkP4efKTKSCi9CZ"; // Keep your token secure!
        const response = await apiClient.get("/api/list-members", {
          headers: {
            "X-Api-Token": apiToken,
          },
        });
        console.log("Fetched data:", response.data.result);

        // Adding full name property
        customers.value = response.data.result.map((customer) => ({
          ...customer,
          "full-name": `${customer["first-name"]} ${customer["last-name"]}`, // Create full name
        }));
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      } finally {
        loading.value = false;
      }
    });
    const exportRowAsCSV = (data) => {
      const csvContent = [
        [
          "id",
          "Picture",
          "First Name",
          "Last Name",
          "Email Address",
          "Title",
          "Position",
          "Commission",
          "Bonus",
          "Created At",
        ],
        [
          data["id"],
          data["avatar-url"],
          data["first-name"],
          data["last-name"],

          data["email-address"],
          data.title,
          data.position,
          data.comission,
          data.bonus,
          formatDate(new Date(data.created_at)),
        ],
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${data["first-name"]}_${data["last-name"]}_details.csv`;
      link.click();
    };
    // Format date function
    const formatDate = (value) => {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    // Initialize filters on setup
    initFilters();

    return {
      customers,
      filters,
      loading,
      formatDate,
      clearFilter: initFilters,
      exportRowAsCSV,
      selectedNum,
      Numbers,
    };
  },
};
</script>

<style>
.custom-clear-btn {
  color: #818488; /* Custom text color */
  border-color: #5b5b5c; /* Custom border color */
}

.custom-clear-btn:hover {
  background-color: #dddddd; /* Custom background color on hover */
}

.custom-clear-btn:active {
  background-color: #9b9ea3; /* Background color when clicked */
}
.headerTable {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
@media screen and (max-width:  842px){

}
</style>
