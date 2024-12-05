<template>
    <div
        class="modal draggable-window"
        data-app="aboutMe"
        :class="{ minimized: isMinimized }"
    >
        <TitleBar
            title="About Me"
            @close="$emit('close')"
            @minimize="toggleMinimize"
            @maximize="toggleMaximize"
            @startDrag="handleStartDrag($event)"
        />
        <div class="content" v-show="!isMinimized">
            <div class="notebook-container" :class="{ maximized: isMaximized }">
                <h2 class="notebook-title">about me !!</h2>

                <!-- Photos -->
                <div class="photo photo-1">
                    <img src="../assets/aboutMe/picture1.jpg" alt="Photo 1" />
                </div>
                <div class="photo photo-2">
                    <img src="../assets/aboutMe/picture3.jpg" alt="Photo 2" />
                </div>
                <div class="photo photo-3">
                    <img src="../assets/aboutMe/picture4.jpg" alt="Photo 3" />
                </div>
                <div class="photo photo-4">
                    <img src="../assets/aboutMe/picture2.jpg" alt="Photo 4" />
                </div>
                <div class="photo photo-5">
                    <img src="../assets/aboutMe/picture5.jpg" alt="Photo 5" />
                </div>

                <!-- Text Boxes -->
                <div class="text-box text-1">
                    <p>
                        👋 Hi! I'm Owen Wong, and I'm a CS student from
                        University of Waterloo!
                    </p>
                </div>
                <div class="text-box text-2">
                    <p>
                        🧑‍💻 Passionate about full-stack development, frontend
                        engineering, and mobile development
                    </p>
                </div>
                <div class="text-box text-3">
                    <p>Thanks for checking out my website!</p>
                </div>

                <!-- Stars -->
                <div class="star star-1">⭐</div>
                <div class="star star-2">⭐</div>
                <div class="star star-3">⭐</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TitleBar from "./TitleBar.vue";
import { startDrag } from "../utils/windowHelpers";

export default defineComponent({
    components: { TitleBar },
    emits: ["close", "updateZIndex"],
    setup(_, { emit }) {
        const isMinimized = ref(false);
        const isMaximized = ref(false);
        const originalSize = ref({ width: "400px", height: "500px" });

        const toggleMinimize = () => {
            isMinimized.value = !isMinimized.value;
        };

        const toggleMaximize = () => {
            isMaximized.value = !isMaximized.value;
            const element = document.querySelector(
                `.draggable-window[data-app="aboutMe"]`
            ) as HTMLElement;
            if (isMaximized.value) {
                originalSize.value = {
                    width: element.style.width,
                    height: element.style.height,
                };
                element.style.width = "100%";
                element.style.height = "calc(100% - 101px)";
                element.style.top = "24px";
                element.style.left = "0";
                element.style.transform = "none";
            } else {
                element.style.width = originalSize.value.width;
                element.style.height = originalSize.value.height;
                element.style.top = "5%";
                element.style.left = "50%";
                element.style.transform = `translate(-50%, 0)`;
            }
        };

        const handleStartDrag = (event: MouseEvent) => {
            if (window.ds) {
                startDrag(
                    event,
                    event.currentTarget as Element,
                    emit,
                    window.ds
                );
            }
        };

        return {
            isMinimized,
            isMaximized,
            toggleMinimize,
            toggleMaximize,
            handleStartDrag,
        };
    },
});
</script>

<style scoped>
.modal {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 540px;
    height: 700px;
    border-radius: 8px;
    overflow: hidden;
}

.content {
    height: calc(100% - 28px);
    background: #f5f5f5;
    overflow-y: auto;
}

.notebook-container {
    position: relative;
    width: 500px;
    height: 93%;
    margin: 0 auto;
    background: #f8f8f8;
    background-image: linear-gradient(#e8e8e8 1px, transparent 1px);
    background-size: 100% 20px;
    padding: 20px;
}

.spacer {
    height: 20vh;
    width: 100%;
}

.notebook-title {
    font-size: 24px;
    margin-top: 0px;
    margin-left: 150px;
}

.photo {
    position: absolute;
    background: #333;
    padding: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}

.photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.photo-1 {
    width: 150px;
    height: 150px;
    top: 25px;
    left: 50px;
}

.photo-2 {
    width: 180px;
    height: 120px;
    top: 210px;
    right: 80px;
}

.photo-3 {
    width: 120px;
    height: 120px;
    top: 200px;
    left: 70px;
}

.photo-4 {
    width: 120px;
    height: 160px;
    top: 360px;
    right: 110px;
}

.photo-5 {
    width: 180px;
    height: 120px;
    top: 510px;
    left: 40px;
}

/* Text boxes with fixed positioning */
.text-box {
    position: absolute;
    background: white;
    padding: 10px;
    border-radius: 4px;
    max-width: 200px;
}

.text-1 {
    top: 60px;
    left: 250px;
}

.text-2 {
    top: 350px;
    left: 40px;
}

.text-3 {
    top: 540px;
    right: 45px;
}

/* Stars */
.star {
    position: absolute;
    font-size: 20px;
    color: #ffd700;
}

.star-1 {
    top: 60px;
    right: 75px;
}

.star-2 {
    top: 165px;
    left: 50px;
}

.star-3 {
    top: 610px;
    right: 50px;
}
</style>
