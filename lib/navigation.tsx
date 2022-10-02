import { useTheme } from 'next-themes';

import { Status } from '~/components';
import { usePersistantState, useStatus } from '~/lib';

import { NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: 'Home',
			href: '/',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:play',
			text: 'Intro',
			href: 'https://insightinput.co',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:search',
			text: 'Demo',
			href: 'https://app.insightinput.co',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:code',
			text: 'Code',
			href: '/code',
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:edit-3',
			text: 'Docs',
			href: '/docs',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:clock',
			text: 'Timeline',
			href: '/timeline',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:link',
			text: 'Credit',
			href: '/credit',
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:github',
			text: 'GitHub',
			href: 'https://github.com/Insight-Input',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:at-sign',
			text: 'SpaceRoamers',
			href: 'https://2022.spaceappschallenge.org/challenges/2022-challenges/art-worlds/teams/space-roamers',
			external: true,
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:mail',
			text: 'Contact',
			href: 'mailto:hi@insightinput.com',
			external: true,
		},
	],
];

export function useNavigation() {
	const state = usePersistantState();
	const { animations: background, sound } = state.get();
	const { color, loading, status } = useStatus();
	const { theme, setTheme } = useTheme();

	const menuItems: NavigationItems = [
		...staticMenuItems,
		...(!loading && status.discord_status !== 'offline'
			? [
				[
					{
						type: NavigationItemType.LINK,
						icon: <Status.Indicator color={color} pulse />,
						text: 'Status',
						href: '/status',
					} as NavigationItem,
				],
			]
			: []),
	];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-circle' : 'feather:circle',
				text: `Animations ${background ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-circle' : 'feather:circle',
				text: `Sounds ${sound ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
			{
				type: NavigationItemType.DIVIDER,
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:monitor',
				endIcon: theme === Theme.SYSTEM ? 'feather:check-circle' : undefined,
				text: 'System Theme',
				onClick: () => setTheme(Theme.SYSTEM),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:sun',
				endIcon: theme === Theme.LIGHT ? 'feather:check-circle' : undefined,
				text: 'Light Theme',
				onClick: () => setTheme(Theme.LIGHT),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:moon',
				endIcon: theme === Theme.DARK ? 'feather:check-circle' : undefined,
				text: 'Dark Theme',
				onClick: () => setTheme(Theme.DARK),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
