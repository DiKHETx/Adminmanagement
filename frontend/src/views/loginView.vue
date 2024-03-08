<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        เข้าสู่ระบบ
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label
          for="username"
          placeholder="username"
          class="block text-sm font-medium leading-6 text-gray-900"
          >บัญชีผู้ใช้งาน</label
        >
        <div class="mt-2">
          <input
            id="username"
            name="username"
            placeholder="บัญชีผู้ใช้งาน"
            v-model="formData.username"
            type="text"
            autocomplete="username"
            required
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >รหัสผ่าน</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            placeholder="รหัสผ่าน"
            v-model="formData.password"
            type="password"
            autocomplete="current-password"
            required
            class="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          v-on:click="SIGN_IN"
          class="my-2.5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          เข้าสู่ระบบ
        </button>
      </div>
      <button
        type="button"
        v-on:click="SIGN_UP"
        class="my-2.5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        สมัครสมาชิก
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import { LOGIN_API, baseURL } from "@/APIgate";

export default {
  name: "HomeView",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    // HelloWorld,
  },
  methods: {
    async SIGN_IN() {
      try {
        var res = await axios({
          method: "post",
          url: `${baseURL}${LOGIN_API}`,
          data: {
            username: this.formData.username,
            password: this.formData.password,
          },
        });
        if (res.status != 200) {
          console.log(res.data);
          console.log(res.status);
        } else {
          console.log(res.data);
          console.log(res.status);
          localStorage.setItem("accessToken", res.data.accessToken);
          this.checkToken();
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkToken() {
      const existToken = localStorage.getItem("accessToken");
      console.log(existToken);
      if (existToken) {
        this.$router.push("/home");
      } else {
        this.$router.push("/");
      }
    },
    SIGN_UP() {
      this.$router.push("/register");
    },
  },
};
</script>
