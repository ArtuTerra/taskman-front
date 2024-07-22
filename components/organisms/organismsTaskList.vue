<template>
	<div class="task__list">
		<TaskBox
			v-for="task in tasks"
			:key="task.id"
			:title="task.title"
			:description="task.description"
			:completed="task.completed"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import TaskBox from "@/components/molecules/taskBox.vue";

export default defineComponent({
	name: "TaskList",
	components: {
		TaskBox,
	},
	setup() {
		const taskStore = useTaskStore();
		const tasks = ref(taskStore.tasks);

		onMounted(async () => {
			await taskStore.fetchTasks();
			tasks.value = taskStore.tasks;
		});

		return { tasks };
	},
});
</script>

<style scoped lang="scss">
.task__list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
}
</style>
