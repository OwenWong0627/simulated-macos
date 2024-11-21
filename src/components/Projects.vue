<template>
    <div class="modal projects">
        <button @click="$emit('close')">Close</button>
        <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vSgVmlLMIRpT5HdPMdCJs00LbrLkhf8hB3oe3AKj1XesZjO1RZTMVrXZtUJTr8gBUHJGiF7Sa_f9AZq/embed?start=false&loop=false&delayms=3000"
            frameborder="0"
            width="960"
            height="569"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
        ></iframe>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 960px;
    z-index: 100;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
}
button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
