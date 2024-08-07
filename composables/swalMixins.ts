import Swal from "sweetalert2";

export const useToastSuccess = Swal.mixin({
	toast: true,
	background: "#cce0ff",
	color: "#1c2b41",
	position: "bottom-end",
	icon: "success",
	iconColor: "#5c991f",
	showConfirmButton: false,
	timer: 2500,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	},
});

export const useToastError = Swal.mixin({
	toast: true,
	background: "#ffb8b8",
	color: "#0b0b0e",
	position: "bottom-end",
	icon: "error",
	iconColor: "#750000",
	showConfirmButton: true,
	confirmButtonColor: "#4e0000",
	timer: 5000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	},
});

export const useToast = Swal.mixin({
	toast: true,
	background: "#cce0ff",
	color: "#1c2b41",
	position: "bottom-end",
	showConfirmButton: false,
	timer: 2500,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	},
});

export const useAlertSuccess = Swal.mixin({
	background: "#1c2b41",
	color: "#b6c2cf",
	confirmButtonColor: "#579dff",
	icon: "success",
});

export const useAlertError = Swal.mixin({
	background: "#1c2b41",
	color: "#b6c2cf",
	icon: "error",
	showConfirmButton: true,
	confirmButtonColor: "#579dff",
});

export const useAlert = Swal.mixin({
	background: "#1c2b41",
	color: "#b6c2cf",
});
