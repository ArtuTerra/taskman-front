<template>
	<div class="fixed top-16 w-72">
		<Combobox v-model="selected">
			<div class="relative mt-1">
				<div
					class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
				>
					<ComboboxInput
						class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
						:display-value="(person) => person.name"
						@change="query = $event.target.value"
					/>
					<ComboboxButton
						class="absolute inset-y-0 right-0 flex items-center pr-2"
					>
						<img class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</ComboboxButton>
				</div>
				<TransitionRoot
					leave="transition ease-in duration-100"
					leave-from="opacity-100"
					leave-to="opacity-0"
					@after-leave="query = ''"
				>
					<ComboboxOptions
						class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
					>
						<div
							v-if="filteredPeople.length === 0 && query !== ''"
							class="relative cursor-default select-none px-4 py-2 text-gray-700"
						>
							Nothing found.
						</div>

						<ComboboxOption
							v-for="person in filteredPeople"
							:key="person.id"
							v-slot="{ selected, active }"
							as="template"
							:value="person"
						>
							<li
								class="relative cursor-default select-none py-2 pl-10 pr-4"
								:class="{
									'bg-teal-600 text-white': active,
									'text-gray-900': !active,
								}"
							>
								<span
									class="block truncate"
									:class="{ 'font-medium': selected, 'font-normal': !selected }"
								>
									{{ person.name }}
								</span>
								<span
									v-if="selected"
									class="absolute inset-y-0 left-0 flex items-center pl-3"
									:class="{ 'text-white': active, 'text-teal-600': !active }"
								>
									<img class="h-5 w-5" aria-hidden="true" />
								</span>
							</li>
						</ComboboxOption>
					</ComboboxOptions>
				</TransitionRoot>
			</div>
		</Combobox>
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { ref, computed } from "vue";
import {
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
	TransitionRoot,
} from "@headlessui/vue";
import type { User } from "~/types/user";

export default defineComponent({
	name: "TaskTitle",
	props: {
		people: {
			type: Array as PropType<Array<User>>,
			required: true,
		},
	},
});
</script>
<script lang="ts" setup>
const people = [
	{ id: 1, name: "Wade Cooper" },
	{ id: 2, name: "Arlene Mccoy" },
	{ id: 3, name: "Devon Webb" },
	{ id: 4, name: "Tom Cook" },
	{ id: 5, name: "Tanya Fox" },
	{ id: 6, name: "Hellen Schmidt" },
];

const selected = ref(people[0]);
const query = ref("");

const filteredPeople = computed(() =>
	query.value === ""
		? people
		: people.filter((person) =>
				person.name
					.toLowerCase()
					.replace(/\s+/g, "")
					.includes(query.value.toLowerCase().replace(/\s+/g, "")),
			),
);
</script>
