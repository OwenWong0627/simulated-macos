<template>
    <div class="homescreen-container">
        <div
            v-for="app in apps"
            :key="app.name"
            class="app-container"
            @click="toggleApp(app.nickName)"
        >
            <img :src="app.icon" :alt="app.name" class="app-icon" />
            <p class="app-name">{{ app.name }}</p>
            <div
                v-if="visibleApps[app.nickName]"
                class="app-open-indicator"
            ></div>
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
                icon: new URL("./assets/resume.png", import.meta.url),
                nickName: "aboutMe",
            },
            {
                name: "Experience",
                icon: new URL("./assets/resume.png", import.meta.url),
                nickName: "experience",
            },
            {
                name: "Resume",
                icon: new URL("./assets/resume.png", import.meta.url),
                nickName: "resume",
            },
            {
                name: "Projects",
                icon: new URL("./assets/resume.png", import.meta.url),
                nickName: "projects",
            },
        ]);
        const visibleApps = reactive({});
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

        return { apps, visibleApps, toggleApp, closeApp, zIndexes };
    },
});
</script>

<style>
.homescreen-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row; /* Ensures children are stacked vertically */
    justify-content: flex-end; /* Aligns the app-container to the bottom */
    padding: 20px 40px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Ensure it is above other content */
}

.app-open-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: black;
    margin-top: 5px;
}

.app-container {
    width: 100%;
    display: absolute;
    bottom: 0;
    justify-content: center;
    gap: 40px;
    transition: transform 0.3s ease;
    padding: 10px;
    background: rgba(250, 250, 250, 0.9);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

.app-icon {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-name {
    margin-top: 8px;
    font-size: 14px;
    color: #333;
    text-align: center;
}

.app-container:hover,
.app-container:focus {
    transform: scale(1.1);
    outline: none; /* Accessibility: Outline on focus for keyboard navigation */
}
</style>
