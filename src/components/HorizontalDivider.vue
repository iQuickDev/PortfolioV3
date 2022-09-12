<script setup lang="ts">

</script>

<template>
    <div class="horizontal-divider">
        <div class="divider-line"></div>
        <div class="divider-rhombus"></div>
        <div class="divider-line"></div>
    </div>
</template>

<style scoped>
.horizontal-divider
{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin: auto;
    vertical-align: middle;
    margin-top: 10px;
    margin-bottom: 10px;
}

.divider-rhombus
{
    width: 10px;
    height: 10px;
    border: 1px solid #e443de;
    transform: rotate(45deg) translate(-4px, -4px);
}

.divider-line
{
    width: 40%;
    background: #e443de;
    height: 1px;
}
</style>