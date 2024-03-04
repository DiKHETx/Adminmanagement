<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">สมัครสมาชิก</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">username</label>
          <div class="mt-2">
            <input  type="text" placeholder="username" v-model="formData.username" autocomplete="username" required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">password</label>
          <div class="mt-2">
            <input  type="password" placeholder="password" v-model="formData.password" autocomplete="tom" required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div class="mt-2">
            <input type="text" placeholder="First name" v-model="formData.firstname" autocomplete="username" required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div class="mt-2">
            <input  type="text" placeholder="Last name" v-model="formData.lastname" autocomplete="loveyou" required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
          <div class="mt-2">
            <input  type="phone" placeholder="000-0000-000" v-model="formData.phone" autocomplete="username"
              required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Mail</label>
          <div class="mt-2">
            <input  type="mail" placeholder="user01@test.com" v-model="formData.mail" autocomplete="username"
              required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">gender</label>
          <div class="mt-2">
            <input  type="text"  v-model="formData.gender" placeholder="ชาย,หญิง"  autocomplete="username"
              required
              class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <button type="submit" v-on:click="SIGN_UP()"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { REGISTER_API, baseURL } from '@/APIgate';
export default {
  name: "SingupView",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phoneNo: "",
        gender: "",
        email: "",
      },
    };
  },

  methods: {
    SIGN_UP() {
      axios({
        method: "post",
        url:`${baseURL}${REGISTER_API}`,
        data: {
          username: this.formData.username,
          password: this.formData.password,
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          phoneNo: this.formData.phone,
          gender: this.formData.gender,
          email: this.formData.mail,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
