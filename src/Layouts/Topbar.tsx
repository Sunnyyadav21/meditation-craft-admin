
//@ts-nocheck
import { Image } from 'react-bootstrap'
import { ThemeSettings, useThemeContext } from '@/common'
import { Link } from 'react-router-dom'

// assets
import logo from '@/assets/images/logo.png'
import logoSm from '@/assets/images/logo-sm.png'
import logoDark from '@/assets/images/logo-dark.png'
import profilePic from '@/assets/images/users/avatar-1.jpg'
 
// components
import {
	ProfileDropdown,
} from '@/components'
import { useThemeCustomizer } from '@/components'
import { useViewport } from '@/hooks'
/**
 * for subtraction minutes
 */
function subtractHours(date: Date, minutes: number) {
	date.setMinutes(date.getMinutes() - minutes)
	return date
}
export interface MessageItem {
	id: number
	name: string
	subText: string
	avatar: string
	createdAt: Date
}

export interface NotificationItem {
	id: number
	title: string
	icon: string
	variant: string
	createdAt: Date
}

 
const profileMenus: ProfileOption[] = [
	{
		label: 'My Account',
		icon: 'ri-account-circle-line',
		redirectTo: '/pages/profile',
	},
	{
		label: 'Settings',
		icon: 'ri-settings-4-line',
		redirectTo: '/pages/profile',
	},
	{
		label: 'Support',
		icon: 'ri-customer-service-2-line',
		redirectTo: '/pages/faq',
	},
	{
		label: 'Lock Screen',
		icon: 'ri-lock-password-line',
		redirectTo: '/auth/lock-screen',
	},
	{
		label: 'Logout',
		icon: 'ri-logout-box-line',
		redirectTo: '/auth/logout',
	},
]

type TopbarProps = {
	topbarDark?: boolean
	toggleMenu?: () => void
	navOpen?: boolean
}
const Topbar = ({ toggleMenu, navOpen }: TopbarProps) => {
	const { sideBarType } = useThemeCustomizer()
	const { width } = useViewport()

	/**
	 * Toggle the leftmenu when having mobile screen
	 */

	const handleLeftMenuCallBack = () => {
		if (width < 768) {
			if (sideBarType === 'full') {
				showLeftSideBarBackdrop()
				document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
			} else {
				updateSidebar({ size: ThemeSettings.sidebar.size.full })
			}
		} else if (sideBarType === 'condensed') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default })
		} else if (sideBarType === 'full') {
			showLeftSideBarBackdrop()
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
		} else if (sideBarType === 'fullscreen') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default })
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
		} else {
			updateSidebar({ size: ThemeSettings.sidebar.size.condensed })
		}
	}

	/**
	 * creates backdrop for leftsidebar
	 */
	function showLeftSideBarBackdrop() {
		const backdrop = document.createElement('div')
		backdrop.id = 'custom-backdrop'
		backdrop.className = 'offcanvas-backdrop fade show'
		document.body.appendChild(backdrop)

		backdrop.addEventListener('click', function () {
			document
				.getElementsByTagName('html')[0]
				.classList.remove('sidebar-enable')
			hideLeftSideBarBackdrop()
		})
	}

	function hideLeftSideBarBackdrop() {
		const backdrop = document.getElementById('custom-backdrop')
		if (backdrop) {
			document.body.removeChild(backdrop)
			document.body.style.removeProperty('overflow')
		}
	}
	const { updateSidebar } = useThemeContext()

	/**
	 * Toggle Dark Mode
	 */

	return (
		<>
			<div className="navbar-custom">
				<div className="topbar container-fluid">
					<div className="d-flex align-items-center gap-1">
						{/* Topbar Brand Logo */}
						<div className="logo-topbar">
							{/* Logo light */}
							<Link to="/" className="logo-light">
								<span className="logo-lg">
									<Image src={logo} alt="logo" />
								</span>
								<span className="logo-sm">
									<Image src={logoSm} alt="small logo" />
								</span>
							</Link>
							{/* Logo Dark */}
							<Link to="/" className="logo-dark">
								<span className="logo-lg">
									<img src={logoDark} alt="dark logo" />
								</span>
								<span className="logo-sm">
									<img src={logoSm} alt="small logo" />
								</span>
							</Link>
						</div>
						{/* Sidebar Menu Toggle Button */}
						<button
							className="button-toggle-menu"
							onClick={handleLeftMenuCallBack}
						>
							<i className="ri-menu-line" />
						</button>
						{/* Horizontal Menu Toggle Button */}
						<button
							className={`navbar-toggle ${navOpen ? 'open' : ''}`}
							data-bs-toggle="collapse"
							data-bs-target="#topnav-menu-content"
							onClick={toggleMenu}
						>
							<div className="lines">
								<span />
								<span />
								<span />
							</div>
						</button>
					</div>
					<ul className="topbar-menu d-flex align-items-center gap-3">

						<li className="dropdown">
							<ProfileDropdown
								menuItems={profileMenus}
								userImage={profilePic}
								username="Thomson"
							/>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Topbar
