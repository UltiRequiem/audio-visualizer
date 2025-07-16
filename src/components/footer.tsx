const createdYear = 2022;

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	const yearToShow = currentYear === createdYear
		? createdYear
		: `${createdYear} - ${currentYear}`;

	return (
		<footer>
			<p>© {yearToShow} Eliaz Bobadilla</p>

			<a
				className='text-blue-900 underline'
				href='https://github.com/UltiRequiem/audio-visualizer'
			>
        Source Code
			</a>
		</footer>
	);
};
