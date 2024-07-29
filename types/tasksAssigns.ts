import type { UserInfo } from "~/types/users";

export interface TaskAssigns {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	creator_id: number;
	assigned_users: UserInfo[];
}
