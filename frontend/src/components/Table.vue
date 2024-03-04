<template>
    <div>
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
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user._id">
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
          </tr>
        </tbody>
      </table>
  
      <!-- Modal สำหรับแก้ไขข้อมูล -->
      <div v-if="isEditing" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white rounded-lg p-8">
          <!-- ฟอร์มสำหรับแก้ไขข้อมูล -->
          <form @submit.prevent="updateUser">
            <!-- ป้อนข้อมูลแก้ไข -->
            <input type="text" v-model="editUserData.email" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="อีเมล์">
            <input type="text" v-model="editUserData.username" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="ชื่อผู้ใช้">
            <input type="text" v-model="editUserData.firstname" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="ชื่อจริง">
            <input type="text" v-model="editUserData.lastname" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="นามสกุล">
            <input type="text" v-model="editUserData.phoneNo" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="เบอร์โทร">
            <input type="text" v-model="editUserData.gender" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="เพศ">
            <input type="text" v-model="editUserData.role" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="บทบาท">
  
            <!-- ปุ่มยืนยันการแก้ไข -->
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">บันทึก</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        searchQuery: '',
        isEditing: false,
        editUserData: {}
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/users'); // เปลี่ยนเส้นทางไปยัง API ของคุณ
          this.users = response.data.users;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      editUser(user) {
        this.isEditing = true;
        this.editUserData = { ...user };
      },
      async updateUser() {
        try {
          const userId = this.editUserData._id;
          const response = await axios.patch(`http://localhost:3000/api/v1/users/${userId}`, this.editUserData);
          console.log('Update user:', response.data);
          this.isEditing = false;
          this.fetchUsers();
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user => {
          return user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.phoneNo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.gender.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    }
  };
  </script>
  