<template>
    <div class="modal experience">
        <button @click="$emit('close')">Close</button>
        <h1>Experience</h1>
        <ul class="timeline">
            <li v-for="item in experience" :key="item.id">
                <h3>{{ item.title }}</h3>
                <h4>{{ item.company }}</h4>
                <p>{{ item.period }}</p>
                <p>{{ item.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            experience: [
                {
                    id: 1,
                    title: "Software Engineer",
                    company: "Example Inc.",
                    period: "Jan 2021 - Present",
                    description:
                        "Developing software solutions to improve business processes.",
                },
                {
                    id: 2,
                    title: "Junior Developer",
                    company: "Startup XYZ",
                    period: "Jan 2020 - Dec 2020",
                    description:
                        "Contributed to projects in the health tech space.",
                },
                // Add more experiences as needed
            ],
        };
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    width: 80%;
    max-width: 600px;
    z-index: 100;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    overflow-y: auto;
    max-height: 80%;
}
.timeline h3,
.timeline h4 {
    margin: 0;
}
.timeline p {
    margin: 5px 0;
}
button {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
