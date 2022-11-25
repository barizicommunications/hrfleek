<template>
    <a-card
    :bordered="false"
    class="header-solid h-full px-5 py-10"
    :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }"
  >
  <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="data.deductions">
    <a-list-item slot="renderItem" slot-scope="item, index">
        
      <a-card :title="item.name">
        <a slot="extra" href="#">Remove</a>
        {{item.amount}}
      </a-card>
    </a-list-item>
  </a-list>
      <a-button type="primary" block icon="plus">
        Add Deduction
      </a-button>
</a-card>
  
</template>

<script>
export default {
  props:['data']

}
</script>

<style>

</style>