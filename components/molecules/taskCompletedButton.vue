<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TaskCompletedButton",
	props: {
		taskId: {
			type: Number as PropType<number>,
			required: true,
		},
		completed: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: false,
		},
	},
	emits: ["complete-task"],
});
</script>

<template>
	<label class="checkbox">
		<input
			type="checkbox"
			:checked="completed"
			class="checkbox__input"
			@click="$emit('complete-task', taskId, completed)"
		/>
		<svg height="28" width="28" class="checkbox__check">
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
		<AtomsTaskTitle
			v-if="!completed"
			class="completed-text"
			text="To-do"
			size="small"
			style="width: 5rem; justify-content: center"
		/>
		<AtomsTaskTitle
			v-if="completed"
			class="completed-text"
			text="Done!"
			size="small"
			style="width: 5rem; justify-content: center"
		/>
	</label>
</template>

<style scoped lang="scss">
.checkbox {
	color: var(--text-light);
	position: relative;
	padding: 3px 10px;
	max-width: 12.5rem;
	border: 2px solid var(--auxiliary-color-blue-800);
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	&:focus-within {
		outline: 2px solid orangered;
	}

	&:hover {
		background: var(--ds-background-neutral-hovered);
		transition: 0.2s;
	}

	&__input {
		position: absolute;
		left: 10px;
		width: 28px;
		height: 28px;
		opacity: 0;
		cursor: pointer;
		&:focus-visible,
		&:focus {
			outline: none;
		}
	}

	&__input:checked + &__check {
		background: var(--brand-color-primary-900);
		stroke-dashoffset: 0;
	}

	&__check {
		border: 2px solid var(--text-lightblue);
		stroke: #f9f9f9;
		stroke-dasharray: 25;
		stroke-dashoffset: 25;
		stroke-linecap: round;
		stroke-width: 0.2rem;
		border-radius: 0.2rem;
		fill: none;
		transition:
			background 0.4s,
			stroke-dashoffset 0.6s,
			0.2s;
	}

	&:hover &__check {
		border-color: var(--text-lightblue-selected);
		background: var(--ds-background-neutral-subtle-hovered);
		transition: 0.2s;
	}
}
</style>
