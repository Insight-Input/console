import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'Insight Input Cloud';
	const description = "Explore Your Imagination";

	return {
		title,
		description,
		canonical: `https://insightinput.co/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'nuro',
			url: `https://insightinput.co/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://insightinput.co/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@Insight-Input',
			site: '@Insight-Input',
		},
		...props,
	};
}
