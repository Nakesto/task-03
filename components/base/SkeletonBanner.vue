<template>
  <div class="card card-post card-round">
    <b-skeleton-img class="card-img-top"></b-skeleton-img>
    <div class="card-body">
      <b-skeleton width="30%"></b-skeleton>
      <b-skeleton width="50%" class="mt-2"></b-skeleton>
      <div class="d-flex justify-content-between">
        <div style="flex: 1"></div>
        <div class="mr-4 d-flex">
          <b-skeleton type="avatar" class="mr-2"></b-skeleton>
          <b-skeleton type="avatar"></b-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
