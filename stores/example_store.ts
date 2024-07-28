import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch.js";
import type { IPostBlog } from "~/types/postblog";

export const useHomeFirstSalesStore = defineStore("useHomeFirstSalesStore", {
	state: () => ({
		posts: [] as IPostBlog[],
	}),

	actions: {
		setPosts(posts: IPostBlog[]) {
			this.posts = posts;
		},

		async fetchPosts(slugCategory: string) {
			const { data, status } = await useApiFetch("posts", {
				method: "GET",
				params: {
					"with[]": ["user", "category"],
					category_slug: slugCategory,
				},
			});

			if (status.value !== "success") {
				this.setPosts([]);
				return;
			}

			this.setPosts(data.value as IPostBlog[]);
		},
	},
});
