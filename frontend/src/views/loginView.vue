<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        เข้าสู่ระบบ
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="username" placeholder="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <input id="username" name="username" placeholder="username" v-model="formData.username" type="text" autocomplete="username" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password"  class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" placeholder="password" v-model="formData.password" type="password" autocomplete="current-password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" v-on:click="SIGN_UP()"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

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
    HelloWorld,
  },
  async SIGN_IN() {
    try {
      var res = await axios({
        method: "post",
        url: url,
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
    } finally {
      window.location.reload();
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
};
</script>
