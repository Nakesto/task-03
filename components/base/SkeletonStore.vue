<template>
  <div class="card card-post card-round overflow-hidden">
    <div class="row">
      <div class="col-12 col-sm-5 p-0 m-0">
        <b-skeleton-img no-aspect height="205px"></b-skeleton-img>
      </div>
      <div class="col-12 col-sm-7 px-5 px-sm-4 py-3">
        <div class="d-flex align-items-center">
          <b-skeleton type="avatar" class="mr-3"></b-skeleton>
          <b-skeleton width="60%" height="28px"></b-skeleton>
        </div>
        <b-skeleton width="30%" height="20px" class="mt-3"></b-skeleton>
        <div
          class="mt-3 mb-3 d-flex"
          style="overflow: hidden; width: calc(90%); height: 2.2rem"
        >
          <fragment v-for="val in [0, 1, 2, 3]" :key="val">
            <b-skeleton
              type="button"
              style="border-radius: 30%"
              height="25px"
              width="50x"
              class="mr-2"
            ></b-skeleton>
          </fragment>
        </div>
        <div class="d-flex justify-content-between">
          <b-skeleton type="button" height="25px" class="mr-2"></b-skeleton>
          <div class="mr-4 d-flex">
            <b-skeleton type="avatar" class="mr-3"></b-skeleton>
            <b-skeleton type="avatar"></b-skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
