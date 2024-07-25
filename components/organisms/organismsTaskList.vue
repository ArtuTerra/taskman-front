<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useRuntimeConfig } from "nuxt/app";
import { useAuthStore } from "~/stores/authStore.js";

import TaskBox from "@/components/molecules/taskBox.vue";

export default defineComponent({
	name: "TaskList",
	components: {
		TaskBox,
	},
	data() {
		return {
			dataReady: false,
		};
	},
});
</script>

<script lang="ts" setup>
const config = useRuntimeConfig();
const authStore = useAuthStore();
authStore.initialize();

let dataReady = false;

const {
	data: taskInfo,
	status,
	refresh,
} = useAsyncData(
	"taskInfo",
	async (): Promise<{ tasks: any; assigns: any }> => {
		const [tasks, assigns] = await Promise.all([
			$fetch(`${config.public.apiBaseUrl}/api/tasks`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "multipart/form-data",
					// eslint-disable-next-line prettier/prettier
					"Accept": "application/json",
					...authStore.getAuthHeader(),
				},
			}),
			$fetch(`${config.public.apiBaseUrl}/api/public/relations`),
		]);
		if (tasks !== null && assigns !== null) {
			return {
				tasks,
				assigns,
			};
		} else {
			return {
				tasks: [],
				assigns: [],
			};
		}
	},
	{
		lazy: false,
	},
);

onBeforeMount(() => {
	refresh();
	dataReady = true;
});
</script>

<template>
	<div v-if="status === 'pending' || status === 'idle'">
		<p>Loading . . .</p>
	</div>
	<div v-else>
		<div v-if="dataReady">
			<button @click="refresh()">Refresh Data</button>
			<div
				v-if="taskInfo && taskInfo.tasks && taskInfo.tasks.length"
				class="task__list"
			>
				<TaskBox
					v-for="task in taskInfo.tasks"
					:key="task.id"
					:title="task.title"
					:description="task.description"
					:completed="task.completed ? true : false"
				/>
			</div>
			<div v-else>
				<p>No tasks available.</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.task__list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
}
</style>
