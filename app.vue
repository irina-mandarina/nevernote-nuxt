<script setup>
  import axios from 'axios'
  import useUserStore from '~~/store/UserStore'

  axios.interceptors.request.use(function (config) {
    //console.log(config)
    return config;
  }, function (error) {
    console.log(error)
    if (error.request.status === 0) {
      console.log("CORS error")
    }
    else if (error.request.status === 401) {
      console.log("Unauthorised")
      
      const userStore = useUserStore()
      userStore.logOut()
      navigateTo("/login")
    }
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    //console.log(response)
    return response;
  }, function (error) {
    console.log(error)
    if (error.request.status === 0) {
      console.log("CORS error")
    }
    else if (error.request.status === 401) {
      console.log("Unauthorised")
      
      const userStore = useUserStore()
      userStore.logOut()
      navigateTo("/login")
    }
    return Promise.reject(error);
  });
</script>
<template>
  <div>
    <Head>
      <!-- <Script src="https://cdn.jsdelivr.net/npm/vue-demi"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/@vuelidate/core"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/@vuelidate/validators"></Script> -->
      <Link href="https://unpkg.com/pattern.css" rel="stylesheet" />
      <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lora" />
      <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Josefin+Slab" />
      <Link href="https://fonts.cdnfonts.com/css/marmelad" rel="stylesheet" />
      <Link href='https://fonts.googleapis.com/css?family=Frank Ruhl Libre' rel='stylesheet' />
      <Link href='https://fonts.googleapis.com/css?family=Overpass' rel='stylesheet' />
    </Head>
    
      <NuxtPage />
      
  </div>
</template>
<style>
  body {
    width: 100%;
    height: 100%;
    font-family: Overpass;
  }

  .font-lora {
    font-family: Lora;
  }

  .font-marmelad {
    font-family: Marmelad;
    font-weight: 400;
  }

  .font-josefin-slab {
    font-family: Josefin Slab;
  }

  .font-overpass {
    font-family: Overpass;
  }

  .font-frank {
    font-family: Frank Ruhl Libre;
  }

  button {
    font-family: Marmelad;
    font-weight: 400;
    font-size: 12pt;
    letter-spacing: 0.5pt;
  }
</style>
