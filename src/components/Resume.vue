<template>
    <div class="modal resume">
        <button @click="$emit('close')">Close</button>
        <iframe :src="pdfUrl" frameborder="0" width="100%" height="600px">
            Your browser does not support PDFs. Please download the PDF to view
            <!-- it: <a :href="pdfUrl">Download PDF</a>. -->
        </iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Update the filename as needed
            pdfUrl: "/resume.pdf",
        };
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 800px;
    z-index: 100;
    background: black;
    border: 1px solid #ccc;
    padding: 20px;
}
button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
