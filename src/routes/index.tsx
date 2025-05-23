//@ts-nocheck
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
import PrivateRoute from './PrivateRoute';
import Allproduct from '@/pages/product/Allproduct';
import Allcategory from '@/pages/category/Allcategory';

// Lazy load all the views
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'));
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'));

const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));

const Product = React.lazy(() => import('../pages/product/Product'));
const Category = React.lazy(() => import('../pages/category/Category'));

export interface RoutesProps {
	path: RouteProps['path'];
	name?: string;
	element?: RouteProps['element'];
	route?: any;
	exact?: boolean;
	icon?: string;
	header?: string;
	roles?: string[];
	children?: RoutesProps[];
}

// Dashboards
const dashboardRoutes: RoutesProps = {
	path: '/admin',
	name: 'Dashboards',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Dashboard />,
			route: PrivateRoute,
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			element: <Dashboard />,
			route: PrivateRoute,
		},
	],
};

// Product Routes
const productRoute: RoutesProps = {
	path: '/pages',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	children: [
		{
			path: '/pages/product',
			name: 'Product',
			element: <Product />,
			route: PrivateRoute,
		},
		{
			path: '/pages/allproduct',
			name: 'All Products',
			element: <Allproduct />,
			route: PrivateRoute,
		},
	],
};

// Category Routes
const categoryRoute: RoutesProps = {
	path: '/pages',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	children: [
		{
			path: '/pages/category',
			name: 'Category',
			element: <Category />,
			route: PrivateRoute,
		},
		{
			path: '/pages/allcategory',
			name: 'All Categories',
			element: <Allcategory />,
			route: PrivateRoute,
		},
	],
};

// Auth Routes
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
		route: Route,
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
	},
	{
		path: '/auth/forgot-password',
		name: 'Forgot Password',
		element: <ForgotPassword />,
		route: Route,
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
		route: Route,
	},
];

// Public Routes
const otherPublicRoutes: RoutesProps[] = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route,
	},
];

// Flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = [];

	routes = routes || [];
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item);
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
		}
	});
	return flatRoutes;
};

// All routes
const authProtectedRoutes = [dashboardRoutes, productRoute, categoryRoute];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
};
