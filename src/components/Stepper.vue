<template>
  <div id="ctr-stepper">
    <div v-for="(sl, i) in steppers" :key="i" class="stepper">
      <div class="stepper-count" :class="stepperActive <= i && 'active'">{{
        i + 1
      }}</div>
      <div class="stepper-label">{{ sl }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepperActive: Number,
    stepperList: {
      type: Array,
      required: true,
      default: () => {
        return ["Stepper"];
      },
    },
  },
  data() {
    return {
      steppers: [...this.stepperList],
    };
  },
};
</script>


