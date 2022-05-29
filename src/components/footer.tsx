export const Footer = () => {
	const createdYear = 2022;

	const currentYear = new Date().getFullYear();

	const yearToShow = currentYear === createdYear
		? createdYear
		: `${createdYear} - ${currentYear}`;

	return (
		<footer>
			<p>© {yearToShow} Eliaz Bobadilla</p>

			<a
				className='text-blue-900 underline'
				href='https://github.com/UltiRequiem/fibonacci.ultirequiem.com'
			>
        Source Code
			</a>
		</footer>
	);
};
