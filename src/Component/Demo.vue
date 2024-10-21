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
      <h1 class="hd">Teamwork Users</h1>
      <template #header>
        <div class="headerTable">
          <p>Show entries</p>
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
              <InputText
                v-model="filters['global'].value"
                placeholder="Search"
              />
            </IconField>
          </div>
        </div>
      </template>

      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>

      <!-- Picture Column -->
      <Column field="avatar-url" header="Picture" style="min-width: 12rem">
        <template #body="{ data }">
          <img
            :alt="data['first-name']"
            :src="data['avatar-url']"
            style="width: 35px; height: 35px; border-radius: 50%"
          />
        </template>
      </Column>

      <!-- Full Name Column -->
      <Column field="full-name" sortable header="Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data["first-name"] + " " + data["last-name"] }}
        </template>
      </Column>

      <!-- Position Column -->
      <Column header="Position" sortable field="title" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.title }}
        </template>
      </Column>

      <!-- comissionColumn -->
      <Column header="Commission" field="comission" style="min-width: 8rem">
        <template #body="{ data }">
          <InputText
            v-model="data.comission"
            type="number"
            :max="999"
            :min="0"
           
            style="max-width: 4rem"
          />
        </template>
      </Column>

      <!-- Bonus Column -->
      <Column header="Bonus" field="bonus" style="min-width: 8rem">
        <template #body="{ data }">
          <InputText
            v-model="data.bonus"
            type="number"
            :max="999"
            :min="0"
            
            style="max-width: 4rem"
          />
        </template>
      </Column>

      <!-- Action Column -->
      <Column header="Action" style="min-width: 8rem">
        <template #body="{ data }">
          <Button
            label="Update"
            :disabled="!canUpdate(data)"
            @click="updateMember(data)"
            icon="pi pi-save"
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

    // Fetch the customer data from API
    onMounted(async () => {
      try {
        const apiToken =
          "HSwljzbFAR0WzVFuDvOZZ9HTQB44Qdw2kVVPTjU7aeEJ9mW2DEkP4efKTKSCi9CZ";
        const response = await apiClient.get("/api/list-members", {
          headers: {
            "X-Api-Token": apiToken,
          },
        });
        console.log("Fetched data:", response.data.result);

        customers.value = response.data.result.map((customer) => ({
          ...customer,
          "full-name": `${customer["first-name"]} ${customer["last-name"]}`,
        }));
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      } finally {
        loading.value = false;
      }
    });

    // Method to update the member's comission and bonus
    const updateMember = async (customer) => {
      console.log(customer);
      console.log(customer.comission);
      console.log(customer.bonus);
      try {
        if (!customer.comission || !customer.bonus) {
          alert("Both comissionand bonus are required to update the data.");
          return;
        }

        const apiToken =
          "HSwljzbFAR0WzVFuDvOZZ9HTQB44Qdw2kVVPTjU7aeEJ9mW2DEkP4efKTKSCi9CZ";
        const updateData = {
          comission: customer.comission,
          bonus: customer.bonus,
        };

        const response = await apiClient.put(
          `/api/update-member/${customer.tw_user_id}`,
          updateData,
          {
            headers: {
              "X-Api-Token": apiToken,
            },
          }
        );
        console.log("Updated member:", response.data);
        alert("Member updated successfully!");
      } catch (error) {
        console.error("Failed to update member:", error);
        alert("Failed to update member!");
      }
    };

    // Check if comissionand bonus can be updated
    const canUpdate = (customer) => {
      // Allow updating only if both fields are filled or both are null
      if (customer.comission !== null && customer.bonus !== null) {
        return customer.comission && customer.bonus;
      }
      return true; // Allow editing if both fields are null
    };

    // Initialize filters
    initFilters();

    return {
      customers,
      filters,
      loading,
      clearFilter: initFilters,
      updateMember,
      canUpdate,
      selectedNum,
      Numbers,
    };
  },
};
</script>

<style>
.custom-clear-btn {
  color: #818488;
  border-color: #5b5b5c;
}

.custom-clear-btn:hover {
  background-color: #dddddd;
}

.custom-clear-btn:active {
  background-color: #9b9ea3;
}
.headerTable {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
@media screen and (max-width: 842px) {
  .hd {
    font-size: 20px;
  }
}
</style>
