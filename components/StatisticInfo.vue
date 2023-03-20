<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title fw-bold">Overall statistics</div>
      <div class="card-category">
        Daily information about statistics in system
      </div>
      <div class="d-flex flex-wrap justify-content-around pb-2 pt-4">
        <div class="px-2 pb-2 pb-md-0 text-center">
          <div id="circles-1">
            <div
              class="circles-wrp"
              style="position: relative; display: inline-block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90">
                <path
                  fill="transparent"
                  stroke="#f1f1f1"
                  stroke-width="7"
                  d="M 44.99154756204665 3.500000860767564 A 41.5 41.5 0 1 1 44.942357332570026 3.500040032273624 Z"
                  class="circles-maxValueStroke"
                ></path>
                <path
                  fill="transparent"
                  stroke="#FF9E27"
                  stroke-width="7"
                  d="M 44.99154756204665 3.500000860767564 A 41.5 41.5 0 1 1 20.64435763625984 78.60137921350231 "
                  class="circles-valueStroke"
                ></path>
              </svg>
              <div
                class="circles-text"
                style="
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  text-align: center;
                  width: 100%;
                  font-size: 31.5px;
                  height: 90px;
                  line-height: 90px;
                "
              >
                {{ userLength }}
              </div>
            </div>
          </div>
          <h6 class="fw-bold mt-3 mb-0">User Count</h6>
        </div>
        <div class="px-2 pb-2 pb-md-0 text-center">
          <div id="circles-2">
            <div
              class="circles-wrp"
              style="position: relative; display: inline-block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90">
                <path
                  fill="transparent"
                  stroke="#f1f1f1"
                  stroke-width="7"
                  d="M 44.99154756204665 3.500000860767564 A 41.5 41.5 0 1 1 44.942357332570026 3.500040032273624 Z"
                  class="circles-maxValueStroke"
                ></path>
                <path
                  fill="transparent"
                  stroke="#2BB930"
                  stroke-width="7"
                  d="M 44.99154756204665 3.500000860767564 A 41.5 41.5 0 1 1 5.5495771787290025 57.88076625138973 "
                  class="circles-valueStroke"
                ></path>
              </svg>
              <div
                class="circles-text"
                style="
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  text-align: center;
                  width: 100%;
                  font-size: 31.5px;
                  height: 90px;
                  line-height: 90px;
                "
              >
                {{ activeProduct }}
              </div>
            </div>
          </div>
          <h6 class="fw-bold mt-3 mb-0">Active Product</h6>
        </div>
        <div class="px-2 pb-2 pb-md-0 text-center">
          <div id="circles-3">
            <div
              class="circles-wrp"
              style="position: relative; display: inline-block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90">
                <path
                  fill="transparent"
                  stroke="#f1f1f1"
                  stroke-width="7"
                  d="M 44.99154756204665 3.500000860767564 A 41.5 41.5 0 1 1 44.942357332570026 3.500040032273624 Z"
                  class="circles-maxValueStroke"
                ></path>
                <path
                  fill="transparent"
                  stroke="#F25961"
                  stroke-width="7"
                  d="M 44.99154756204665 3.500000860767564 A 41.5 41.5 0 0 1 69.44267714510887 78.53812060894248 "
                  class="circles-valueStroke"
                ></path>
              </svg>
              <div
                class="circles-text"
                style="
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  text-align: center;
                  width: 100%;
                  font-size: 31.5px;
                  height: 90px;
                  line-height: 90px;
                "
              >
                {{ promoProduct }}
              </div>
            </div>
          </div>
          <h6 class="fw-bold mt-3 mb-0">Promo Product</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userLength: {
    type: Number,
    required: true,
  },
  activeProduct: {
    type: Number,
    required: true,
  },
  promoProduct: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
