<template>
  <div :class="isActiveBox && 'active'" class="ctr-selected-box">
    <div class="selected-box-title">
      {{ label }}
    </div>
    <div v-if="price && typeof price === 'number'" class="selected-box-subtitle">
      {{ price | numberFormat }}
    </div>
    <div v-if="price && typeof price === 'string'" class="selected-box-subtitle">
      {{ price }}
    </div>
  </div>
</template>

<script>
import { numberFormat } from "@/utils/format";

export default {
  props: {
    value: String,
    label: String,
    price: [Number, String],
    isActive: Object,
  },
  filters: {
    numberFormat: value => {
      if (!value) return "0";
      return numberFormat(value);
    }
  },
  computed: {
    isActiveBox() {
      return this.isActive.value === this.value;
    },
  }
};
</script>
