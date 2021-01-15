<script>
export default {
  props: {
    title: {
      type: String,
      default:
        "<p> İzin verilen ip adresiniz yok. <b>Uygulanıza her yerden erişilebilir.</b> </p>",
    },
  },
};
</script>

<template>
  <tbody>
    <tr>
      <td colspan="2">
        <p v-html="title"></p>
      </td>
    </tr>
  </tbody>
</template>



<style lang="scss" scoped>
</style>