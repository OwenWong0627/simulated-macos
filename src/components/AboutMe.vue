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

<script lang="ts">
export default {
    methods: {
        startDrag(event: MouseEvent) {
            // Prevent the default behavior and stop propagation
            event.preventDefault();
            event.stopPropagation();

            const target = event.target as HTMLElement;
            if (!target) return;
            const element = target.closest(".draggable-window") as HTMLElement;
            if (!element) return;

            if (window.ds && typeof window.ds.break === "function") {
                window.ds.break();
            }

            let startX: number = event.clientX;
            let startY: number = event.clientY;
            let initialLeft = parseInt(
                window.getComputedStyle(element).left,
                10
            );
            let initialTop = parseInt(window.getComputedStyle(element).top, 10);

            const onDragging = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                element.style.left = `${initialLeft + dx}px`;
                element.style.top = `${initialTop + dy}px`;
            };

            const stopDrag = () => {
                document.removeEventListener("mousemove", onDragging);
                document.removeEventListener("mouseup", stopDrag);
                if (window.ds && typeof window.ds.start === "function") {
                    window.ds.start();
                }
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
