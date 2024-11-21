<template>
    <div
        class="modal draggable-window"
        data-app="aboutMe"
        @mousedown="startDrag"
        @mouseup="stopDrag"
    >
        <button @click="$emit('close')">Close</button>
        <h1>About Me</h1>
        <p>My name is Owen...</p>
    </div>
</template>

<script>
export default {
    methods: {
        startDrag(event) {
            // Initialize dragging
            event.preventDefault();
            const element = event.target.closest(".draggable-window");
            let startX = event.clientX;
            let startY = event.clientY;
            let initialLeft = parseInt(
                window.getComputedStyle(element).left,
                10
            );
            let initialTop = parseInt(window.getComputedStyle(element).top, 10);

            const onDragging = (moveEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                element.style.left = `${initialLeft + dx}px`;
                element.style.top = `${initialTop + dy}px`;
            };

            const stopDrag = () => {
                document.removeEventListener("mousemove", onDragging);
                document.removeEventListener("mouseup", stopDrag);
            };

            document.addEventListener("mousemove", onDragging);
            document.addEventListener("mouseup", stopDrag);
        },
    },
};
</script>

<style scoped>
.modal {
    position: absolute;
    top: 10%;
    left: 10%;
    padding: 20px;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
    width: 300px;
    min-height: 200px;
}
button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
