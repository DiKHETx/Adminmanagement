<template>
  <div>
    <div class="my-2.5 mx-1 bg-gray-100 relative flex" data-twe-input-wrapper-init data-twe-input-group-ref>
      <input type="search" v-model="searchQuery"
  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-black data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
  placeholder="Search" aria-label="Search" id="exampleFormControlInput" aria-describedby="basic-addon1" />

      <label for="exampleFormControlInput"
        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">Search
      </label>
      <button
        class="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="button" id="button-addon1" data-twe-ripple-init data-twe-ripple-color="light">
        <span class="[&>svg]:h-5 [&>svg]:w-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            class="text-neutral-500" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
      </button>
    </div>

    <!-- ตารางแสดงข้อมูล -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            อีเมล์
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ชื่อผู้ใช้
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ชื่อจริง
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            นามสกุล
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            เบอร์โทร
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            เพศ
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            บทบาท
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            แก้ไข
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ลบ
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(user, index) in paginatedUsers" :key="user._id">
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.username }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.firstname }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.lastname }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.phoneNo }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.gender }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ user.role }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900">แก้ไข</button>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button @click="deleteUser(user._id)" class="text-red-600 hover:text-red-900">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal สำหรับแก้ไขข้อมูล -->
    <div v-if="isEditing" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white rounded-lg p-8">
        <!-- ฟอร์มสำหรับแก้ไขข้อมูล -->
        <form @submit.prevent="updateUser">
          <!-- ป้อนข้อมูลแก้ไข -->
          Email
          <input type="text" v-model="editUserData.email" class="border border-gray-300 p-2 mb-4 rounded-lg w-full"
            placeholder="อีเมล์">
          Username
          <input type="text" v-model="editUserData.username" class="border border-gray-300 p-2 mb-4 rounded-lg w-full"
            placeholder="ชื่อผู้ใช้">
          Firstname
          <input type="text" v-model="editUserData.firstname" class="border border-gray-300 p-2 mb-4 rounded-lg w-full"
            placeholder="ชื่อจริง">
          Lastname
          <input type="text" v-model="editUserData.lastname" class="border border-gray-300 p-2 mb-4 rounded-lg w-full"
            placeholder="นามสกุล">
          Phone
          <input type="text" v-model="editUserData.phoneNo" class="border border-gray-300 p-2 mb-4 rounded-lg w-full"
            placeholder="เบอร์โทร">
          Gender
          <input type="text" v-model="editUserData.gender" class="border border-gray-300 p-2 mb-4 rounded-lg w-full"
            placeholder="เพศ">


          <!-- ปุ่มยืนยันการแก้ไข -->
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">บันทึก</button>
          <!-- ปุ่มยกเลิกการแก้ไข -->
          <button @click="cancelEdit"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">ยกเลิก</button>
        </form>
      </div>

    </div>
    <div class="flex justify-between mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
        :class="{ 'cursor-not-allowed': currentPage === 1 }">ย้อนกลับ</button>
      <span>หน้า {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
        :class="{ 'cursor-not-allowed': currentPage === totalPages }">ต่อไป</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { DELETEUSERS_API, GETALLUSERS_API, UPDATEUSERS_API, baseURL } from '@/APIgate'; // นำเข้า URL ของ API และ baseURL ผ่านการใช้ module

export default {
  data() {
    return {
      users: [], // ข้อมูลผู้ใช้ที่ได้รับมาจาก API
      searchQuery: '', // คำค้นหาที่ผู้ใช้ป้อน
      isEditing: false, // สถานะของการแก้ไขข้อมูลผู้ใช้ผ่าน Modal
      editUserData: {}, // ข้อมูลผู้ใช้ที่ถูกเลือกสำหรับการแก้ไข
      currentPage: 1, // หน้าปัจจุบัน
      pageSize: 6 // ขนาดของหน้า
    };
  },
  created() {
    this.fetchUsers(); // เมื่อ component ถูกสร้างขึ้นมา ให้ดึงข้อมูลผู้ใช้จาก API
  },
  watch: {
    searchQuery: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.searchUsers();
      }
    }
  },

  methods: {
    async searchUsers() {
      try {
        let apiUrl = `${baseURL}${GETALLUSERS_API}`;

        // Append search query if available
        if (this.searchQuery) {
          apiUrl += `?Search=${this.searchQuery}`;
        }

        const response = await axios.get(apiUrl);

        this.users = response.data.users;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    // async searchUsers() {
    //   try {
    //     const response = await axios.get(`${baseURL}/users/?Search=${this.searchQuery}`);
    //     this.users = response.data.users;
    //     console.log('Search successful:', this.users);
    //   } catch (error) {
    //     console.error('Error searching users:', error);
    //   }
    // },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    setPage(page) {
      this.currentPage = page;
    },
    async fetchUsers() {
      try {
        const response = await axios.get(`${baseURL}${GETALLUSERS_API}`); // เรียกใช้ API เพื่อดึงข้อมูลผู้ใช้
        this.users = response.data.users; // กำหนดข้อมูลผู้ใช้ให้กับตัวแปร users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    editUser(user) {
      this.isEditing = true; // เปลี่ยนสถานะ isEditing เป็น true เพื่อแสดง Modal สำหรับการแก้ไข
      this.editUserData = { ...user }; // กำหนดข้อมูลผู้ใช้ที่ถูกเลือกไว้ใน editUserData เพื่อให้แสดงใน Modal
    },
    async updateUser() {
      try {
        const userId = this.editUserData._id; // รหัสผู้ใช้ที่จะถูกแก้ไข
        const response = await axios.patch(`${baseURL}${UPDATEUSERS_API}/${userId}`, this.editUserData); // ส่งข้อมูลผู้ใช้ที่แก้ไขไปยัง API
        console.log('Update user:', response.data); // แสดงข้อมูลผู้ใช้ที่ถูกอัปเดตในคอนโซล
        this.isEditing = false; // เปลี่ยนสถานะ isEditing เป็น false เพื่อซ่อน Modal หลังจากการแก้ไขเสร็จสมบูรณ์
        this.fetchUsers(); // ดึงข้อมูลผู้ใช้ใหม่หลังจากการแก้ไขเสร็จสมบูรณ์
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    cancelEdit() {
      this.isEditing = false; // ปิด Modal
    },
    // ฟังก์ชันสำหรับลบผู้ใช้งาน
    async deleteUser(userId) {
      try {
        const { value: confirmDelete } = await Swal.fire({
          title: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้งานนี้?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
        });

        if (confirmDelete) {
          const response = await axios.delete(`${baseURL}${DELETEUSERS_API}/${userId}`);
          console.log('Deleted user:', response.data.user);

          // Check if a search query is present
          if (this.searchQuery) {
            // Fetch users again to update the table with original data
            this.fetchUsers();
          } else {
            // Remove the deleted user from the table directly
            this.users = this.users.filter(user => user._id !== userId);
          }
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },



  },
  computed: {
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    // จำนวนหน้าทั้งหมด
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    filteredUsers() {
      // ฟังก์ชันที่ใช้สำหรับกรองข้อมูลผู้ใช้ตามคำค้นหาของผู้ใช้
      return this.users.filter(user => {
        return user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) || // กรองตามอีเมล์
          user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) || // กรองตามชื่อผู้ใช้
          user.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) || // กรองตามชื่อจริง
          user.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) || // กรองตามนามสกุล
          user.phoneNo.toLowerCase().includes(this.searchQuery.toLowerCase()) || // กรองตามเบอร์โทร
          user.gender.toLowerCase().includes(this.searchQuery.toLowerCase()) || // กรองตามเพศ
          user.role.toLowerCase().includes(this.searchQuery.toLowerCase()); // กรองตามบทบาท
      });
    }
  }
};

</script>