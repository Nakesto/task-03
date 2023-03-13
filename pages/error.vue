<template>
  <div class="page-not-found">
    <div class="wrapper not-found">
      <h1 class="animated fadeIn">404</h1>
      <div class="desc animated fadeIn">
        <span>OOPS!</span><br />Looks like you get lost
      </div>
      <NuxtLink
        to="/"
        class="btn btn-black btn-back-home mt-4 animated fadeInUp"
      >
        <span class="btn-label mr-2">
          <i class="flaticon-home"></i>
        </span>
        Back To Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
