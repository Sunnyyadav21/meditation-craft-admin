export interface MenuItemTypes {
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
	children?: MenuItemTypes[]
}

const MENU_ITEMS: MenuItemTypes[] = [

	{
		key: 'dashboard',
		label: 'Dashboards',
		isTitle: false,
		url: '/',
		icon: 'ri-dashboard-3-line',

	},

	{
		key: 'category',
		label: 'Category',
		isTitle: false,

		icon: 'ri-product-hunt-line',
		children: [
			{
				key: '',
				label: 'Add Category',
				url: '/pages/category',
				parentKey: 'pages',
			},
			{
				key: 'All Category',
				label: 'All Category',
				url: '/pages/allcategory',
				parentKey: 'pages',
			},

		],
	},

	{
		key: 'product',
		label: 'Product',
		isTitle: false,
		//url: '/pages/product',
		icon: 'ri-product-hunt-line',
		children: [
			{
				key: '',
				label: 'Add Product',
				url: '/pages/product',
				parentKey: 'pages',
			},
			{
				key: 'All Product',
				label: 'All Product',
				url: '/pages/allproduct',
				parentKey: 'pages',
			},

		],
	},
	// {
	// 	key: 'pages',
	// 	label: 'Pages',
	// 	isTitle: false,
	// 	icon: 'ri-pages-line',
	// 	children: [
	// 		{
	// 			key: 'pages-Starter',
	// 			label: 'Starter Page',
	// 			url: '/pages/starter',
	// 			parentKey: 'pages',
	// 		},
	// 		{
	// 			key: 'pages-ContactList',
	// 			label: 'Contact List',
	// 			url: '/pages/contact-list',
	// 			parentKey: 'pages',
	// 		},

	// 	],
	// },

]


export { MENU_ITEMS }
