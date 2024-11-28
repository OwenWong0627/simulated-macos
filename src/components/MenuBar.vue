<template>
    <div class="menu-bar">
        <img
            src="../../public/white-apple.svg"
            alt="Apple"
            class="apple-icon menu-item"
        />
        <div class="menu-item">File</div>
        <div class="menu-item">Edit</div>
        <div class="menu-item">View</div>
        <div class="menu-item">Help</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.menu-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 24px;
    background-color: #000;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.menu-item {
    margin-right: 20px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
}

.menu-item:hover {
    color: #007aff;
}

.apple-icon {
    width: 16px;
    height: 16px;
    margin-right: 20px;
}
</style>
