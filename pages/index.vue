<template>
  <div class="container">
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div
          class="d-flex align-items-left align-items-md-center flex-column flex-md-row"
        >
          <div>
            <h2 class="text-white pb-2 fw-bold">Dashboard</h2>
            <h5 class="text-white op-7 mb-2">
              Admin for Alfagift (PT GLOBAL LOYALTY INDONESIA)
            </h5>
          </div>
          <div class="ml-md-auto py-2 py-md-0">
            <NuxtLink
              to="/users"
              class="btn btn-white btn-border btn-round mr-2"
              >User</NuxtLink
            >
            <NuxtLink to="/products" class="btn btn-secondary btn-round"
              >Products</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="page-inner mt--5">
      <div class="row mt--2">
        <div class="col-md-4">
          <div class="card card-info card-annoucement card-round">
            <div class="card-body text-center">
              <div class="card-opening">Welcome {{ data.firstName }},</div>
              <div class="card-desc">
                Congrats and best wishes for success in your brand new life! I
                knew that you would do this!
              </div>
              <div class="card-detail">
                <div class="btn btn-light btn-rounded">View Detail</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card card-profile">
            <div
              class="card-header"
              style="background-image: url('../assets/img/blogpost.jpg')"
            >
              <div class="profile-picture">
                <div class="avatar avatar-xl">
                  <img
                    src="../assets/img/profile.jpg"
                    alt="..."
                    class="avatar-img rounded-circle"
                  />
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="user-profile text-center">
                <div class="name">{{ data.firstName }}, 19</div>
                <div class="job">Frontend Developer</div>
                <div class="desc">A man who hates loneliness</div>
                <div class="social-media">
                  <a class="btn btn-info btn-twitter btn-sm btn-link" href="#">
                    <span class="btn-label just-icon"
                      ><i class="flaticon-twitter"></i>
                    </span>
                  </a>
                  <a
                    class="btn btn-danger btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span class="btn-label just-icon"
                      ><i class="flaticon-google-plus"></i>
                    </span>
                  </a>
                  <a
                    class="btn btn-primary btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span class="btn-label just-icon"
                      ><i class="flaticon-facebook"></i>
                    </span>
                  </a>
                  <a
                    class="btn btn-danger btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span class="btn-label just-icon"
                      ><i class="flaticon-dribbble"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row user-stats text-center">
                <div class="col">
                  <div class="number">125</div>
                  <div class="title">Post</div>
                </div>
                <div class="col">
                  <div class="number">25K</div>
                  <div class="title">Followers</div>
                </div>
                <div class="col">
                  <div class="number">134</div>
                  <div class="title">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-card-no-pd">
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-chart-pie text-warning"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Number</p>
                    <h4 class="card-title">150GB</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-coins text-success"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Revenue</p>
                    <h4 class="card-title">$ 1,345</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-error text-danger"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Errors</p>
                    <h4 class="card-title">23</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-twitter text-primary"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Followers</p>
                    <h4 class="card-title">+45K</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    script: [
      {
        src: "/assets/js/core/bootstrap.min.js",
        body: true,
      },
    ],
  },
};
</script>
<script setup>
import { computed, getCurrentInstance } from "vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;

const data = computed(() => $store.getters["regis/getData"] || []);
</script>

<style lang="scss" scoped></style>
