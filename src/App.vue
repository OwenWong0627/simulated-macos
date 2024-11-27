<template>
    <div class="homescreen-container">
        <div class="navbar">
            <div
                v-for="app in apps"
                :key="app.name"
                class="app-container"
                @mousedown="handleMouseDown(app.nickName)"
                @mouseup="handleMouseUp(app.nickName)"
                @mouseleave="handleMouseLeave(app.nickName)"
                :class="{ pressed: isPressed[app.nickName] }"
            >
                <img :src="app.icon" :alt="app.name" class="app-icon" />
                <div
                    v-if="visibleApps[app.nickName]"
                    class="app-open-indicator"
                ></div>
                <div class="tooltip">{{ app.name }}</div>
            </div>
        </div>

        <!-- App windows -->
        <AboutMe
            v-if="visibleApps.aboutMe"
            @close="closeApp('aboutMe')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['aboutMe'] }"
            data-app="aboutMe"
        />
        <Experience
            v-if="visibleApps.experience"
            @close="closeApp('experience')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['experience'] }"
            data-app="experience"
        />
        <Resume
            v-if="visibleApps.resume"
            @close="closeApp('resume')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['resume'] }"
            data-app="resume"
        />
        <Projects
            v-if="visibleApps.projects"
            @close="closeApp('projects')"
            class="draggable-window"
            :style="{ zIndex: zIndexes['projects'] }"
            data-app="projects"
        />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    watchEffect,
    onUnmounted,
    onMounted,
    watch,
} from "vue";
import DragSelect from "dragselect";
import AboutMe from "./components/AboutMe.vue";
import Experience from "./components/Experience.vue";
import Resume from "./components/Resume.vue";
import Projects from "./components/Projects.vue";

export default defineComponent({
    components: {
        AboutMe,
        Experience,
        Resume,
        Projects,
    },
    setup() {
        const apps = reactive([
            {
                name: "About Me",
                icon: new URL("./assets/profile.png", import.meta.url),
                nickName: "aboutMe",
            },
            {
                name: "Experience",
                icon: new URL("./assets/experience.png", import.meta.url),
                nickName: "experience",
            },
            {
                name: "Resume",
                icon: new URL("./assets/resume.png", import.meta.url),
                nickName: "resume",
            },
            {
                name: "Projects",
                icon: new URL("./assets/project.png", import.meta.url),
                nickName: "projects",
            },
        ]);
        const visibleApps = reactive({});
        const isPressed = reactive({});
        const zIndexes = reactive({});
        const maxZIndex = ref(10);
        let ds: DragSelect | null = null;

        const toggleApp = (appName: string) => {
            if (visibleApps[appName]) {
                visibleApps[appName] = false;
            } else {
                visibleApps[appName] = true;
                zIndexes[appName] = maxZIndex.value++;
            }
            console.log(visibleApps);
        };

        const handleMouseDown = (appName) => {
            isPressed[appName] = true;
        };
        const handleMouseUp = (appName) => {
            if (isPressed[appName]) {
                toggleApp(appName);
                isPressed[appName] = false;
            }
        };

        const handleMouseLeave = (appName) => {
            isPressed[appName] = false;
        };

        const closeApp = (appName: string) => {
            visibleApps[appName] = false;
        };

        function initDragSelect() {
            if (ds) {
                ds.stop(); // Cleanup before re-initializing
            }
            ds = new DragSelect({
                selectables: document.querySelectorAll(".draggable-window"),
                area: document.querySelector(".homescreen-container"),
                ignore: [".navbar", ".navbar *"],
                onDragStart: (element) => {
                    const appName = element.getAttribute("data-app");
                    zIndexes[appName] = maxZIndex.value++;
                    element.style.zIndex = zIndexes[appName].toString();
                },
                callback: (elements) => {
                    elements.forEach((element) => {
                        element.classList.add("selected");
                    });
                },
                ignore: [".navbar, .navbar *"],
            });
        }

        onMounted(initDragSelect);
        onUnmounted(() => {
            if (ds) {
                ds.stop();
            }
        });

        // Reactively update DragSelect's selectables when apps change
        watch(
            () => apps.map((app) => visibleApps[app.nickName]),
            initDragSelect,
            { deep: true }
        );

        return {
            apps,
            visibleApps,
            toggleApp,
            closeApp,
            zIndexes,
            isPressed,
            handleMouseDown,
            handleMouseUp,
            handleMouseLeave,
        };
    },
});
</script>

<style>
.homescreen-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Keeps the navbar at the bottom */
    align-items: center;
    padding: 20px 40px 0 40px;
    background-image: url("./assets/Background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.navbar {
    max-width: 80%; /* Controls the width of the navigation bar */
    min-width: 12.5%;
    display: flex;
    justify-content: space-between; /* Distributes space between app icons */
    background: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    width: 60px;
    height: 60px;
}

.app-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.app-open-indicator {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: black;
}

.app-icon {
    width: 57px;
    height: 57px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pressed .app-icon {
    filter: brightness(70%);
    opacity: 0.6;
}

.tooltip {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.app-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.app-name {
    margin-top: 8px;
    font-size: 14px;
    color: #333;
    text-align: center;
}

.draggable-window {
    position: absolute;
    top: 20%; /* Initial top position for better visibility */
    left: 10%; /* Initial left position for staggered arrangement */
    border: 1px solid #ccc;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
