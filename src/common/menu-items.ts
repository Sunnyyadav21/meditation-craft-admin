export type MenuItemType = {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	target?: string
	children?: MenuItemType[]
}

const MENU_ITEMS: MenuItemType[] = [
	{ key: 'navigation', label: 'Navigation', isTitle: true },
	{
		key: 'dashboards',
		label: 'Dashboards',
		isTitle: false,
		icon: 'uil-home-alt',
		badge: { variant: 'success', text: '4' },
		children: [
			{
				key: 'ds-analytics',
				label: 'Analytics',
				url: '/dashboard/analytics',
				parentKey: 'dashboards',
			},
			{
				key: 'ds-ecommerce',
				label: 'Ecommerce',
				url: '/dashboard/ecommerce',
				parentKey: 'dashboards',
			},
			{
				key: 'ds-project',
				label: 'Projects',
				url: '/dashboard/project',
				parentKey: 'dashboards',
			},
			{
				key: 'ds-ewallet',
				label: 'E-Wallet',
				url: '/dashboard/e-wallet',
				parentKey: 'dashboards',
				badge: { variant: 'danger', text: 'New' },
			},
		],
	},

]

export { MENU_ITEMS }
