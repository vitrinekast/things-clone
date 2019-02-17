export const mixinDevice = {
	methods: {
		isMobile: function () {
			return window.innerWidth < 576
		}
	}
}
