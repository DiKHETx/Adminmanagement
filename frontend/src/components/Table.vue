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
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ลบ
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
            <input type="text" v-model="editUserData.email" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="อีเมล์">
            <input type="text" v-model="editUserData.username" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="ชื่อผู้ใช้">
            <input type="text" v-model="editUserData.firstname" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="ชื่อจริง">
            <input type="text" v-model="editUserData.lastname" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="นามสกุล">
            <input type="text" v-model="editUserData.phoneNo" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="เบอร์โทร">
            <input type="text" v-model="editUserData.gender" class="border border-gray-300 p-2 mb-4 rounded-lg w-full" placeholder="เพศ">

  
            <!-- ปุ่มยืนยันการแก้ไข -->
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">บันทึก</button>
            <!-- ปุ่มยกเลิกการแก้ไข -->
          <button @click="cancelEdit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">ยกเลิก</button>
          </form>
        </div>
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
      editUserData: {} // ข้อมูลผู้ใช้ที่ถูกเลือกสำหรับการแก้ไข
    };
  },
  created() {
    this.fetchUsers(); // เมื่อ component ถูกสร้างขึ้นมา ให้ดึงข้อมูลผู้ใช้จาก API
  },
  methods: {
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
      this.fetchUsers();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
},

  },
  computed: {
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
  