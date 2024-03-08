<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        สมัครสมาชิก
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >username</label
        >
        <div class="mt-2">
          <input
            type="text"
            placeholder="username"
            v-model="formData.username"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >password</label
        >
        <div class="mt-2">
          <input
            type="password"
            placeholder="password"
            v-model="formData.password"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >First name</label
        >
        <div class="mt-2">
          <input
            type="text"
            placeholder="First name"
            v-model="formData.firstname"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >Last name</label
        >
        <div class="mt-2">
          <input
            type="text"
            placeholder="Last name"
            v-model="formData.lastname"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >Phone</label
        >
        <div class="mt-2">
          <input
            type="tel"
            placeholder="000-0000-000"
            v-model="formData.phone"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >Email</label
        >
        <div class="mt-2">
          <input
            type="email"
            placeholder="user01@test.com"
            v-model="formData.mail"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900"
          >gender</label
        >
        <div class="mt-2">
          <input
            type="text"
            v-model="formData.gender"
            placeholder="ชาย,หญิง"
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          v-on:click="SIGN_UP"
          class="my-2.5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { REGISTER_API, baseURL } from "@/APIgate";
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
      if (this.formData.username === this.formData.mail) {
        console.log("username และ email ต้องไม่เหมือนกัน");
        alert("Username และ Email ต้องไม่เหมือนกัน");
        return;
      }
      axios({
        method: "post",
        url: `${baseURL}${REGISTER_API}`,
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
          console.log("สมัครสำเร็จ", res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("ไม่สำเร็จ", error);
        });
    },
  },
};
</script>
