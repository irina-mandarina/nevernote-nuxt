<script setup>
  import axios from 'axios'
  import { useUserStore } from '~~/store/UserStore'

  let userStore = useUserStore()
  axios.interceptors.request.use(function (config) {
    //console.log(config)
    return config;
  }, function (error) {
    displayError(error)
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    //console.log(response)
    return response;
  }, function (error) {
    if(!error.request.responseURL.endsWith('/logout'))
      displayError(error)
    return Promise.reject(error)
  })

  function displayError(error) {
    console.log(error)
    if (error.message === "cors???") {
      console.log("CORS error")
    }
    else if (error.request.status === 401) {
      const userStore = useUserStore()
      userStore.logOut()
      toastr.error("Unauthorised")
      navigateTo("/login")
    }
    else if (error.code === "ERR_NETWORK") {
      toastr.error("Cannot connect to server")
      userStore.server = false
      navigateTo("/")
    }
  }
</script>
<template>
  <div>
    <Head>
      <Link href="https://unpkg.com/pattern.css" rel="stylesheet" />

      <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

      <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lora" />
      <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Josefin+Slab" />
      <Link href="https://fonts.cdnfonts.com/css/marmelad" rel="stylesheet" />
      <Link href='https://fonts.googleapis.com/css?family=Frank Ruhl Libre' rel='stylesheet' />
      <Link href='https://fonts.googleapis.com/css?family=Overpass' rel='stylesheet' />

      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script>
      <Link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></Script>
    </Head>
    
      <NuxtPage />
    
  </div>
</template>
<style>
  body {
    width: 100%;
    height: 100%;
    background-color: #1f2937;
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
