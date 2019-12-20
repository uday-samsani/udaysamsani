import React from 'react';
import { Box, Image, Text, Paragraph } from 'grommet';

import project from '../assets/images/project.png';

const Home = () => {
	return (
		<>
			<Box direction='row-responsive' margin='large' gap='large'>
				<Box margin='medium' animation={['fadeIn', 'slideRight']}>
					<Image src={project} fit='contain' fill />
				</Box>
				<Box
					direction='column'
					gap='xxsmall'
					margin={{ vertical: 'auto', horizontal: 'large' }}
					animation={['fadeIn', 'slideLeft']}
				>
					<Text size='60px' color='#D3333B'>
						Learn Code Deploy Continue
					</Text>
					<Paragraph size='xxlarge' color='#000000'>
						A loop which should never break if broken will brake
						your career.
					</Paragraph>
				</Box>
			</Box>
			<Box
				direction='column'
				pad={{ vertical: 'xlarge', horizontal: 'large' }}
				background={{ color: '#3985C3' }}
			>
				<Text
					size='55px'
					color='#000000'
					margin={{ horizontal: 'auto' }}
				>
					Learn
				</Text>
				<Paragraph
					color='#000000'
					size='large'
					textAlign='center'
					margin={{ horizontal: 'medium' }}
					fill
				>
					These are some of the best languages you should learn to be
					ready in the next big year 2020.
				</Paragraph>
				<Text
					size='large'
					color='#ffffff'
					weight={500}
					margin={{ horizontal: 'medium' }}
					textAlign='center'
				>
					JavaScript Python TypeScript Java
				</Text>
			</Box>
			<Box
				direction='column'
				pad={{ vertical: 'xlarge', horizontal: 'large' }}
				background={{ color: '#02B8A6' }}
			>
				<Text
					size='55px'
					color='#000000'
					margin={{ horizontal: 'auto' }}
				>
					Code
				</Text>
				<Paragraph
					color='#000000'
					size='large'
					textAlign='center'
					margin={{ horizontal: 'medium' }}
					fill
				>
					There are several tools (IDE's and code editors) for
					everyones's need. To me the best tools for developing code
					are Visual Studio Code and IntelliJ.
				</Paragraph>
			</Box>
			<Box
				direction='column'
				pad={{ vertical: 'xlarge', horizontal: 'large' }}
				background={{ color: '#FBB912' }}
			>
				<Text
					size='55px'
					color='#000000'
					margin={{ horizontal: 'auto' }}
				>
					Deploy
				</Text>
				<Paragraph
					color='#000000'
					size='large'
					textAlign='center'
					margin={{ horizontal: 'medium' }}
					fill
				>
					Cloud Storage and computing has opened gates for realiabilty
					and feasability for deployment in the name of Amazon Web
					Services. If not we can also use Heroku which is easy to
					use. For Database's MongoDB atlas is more than enough for
					most the enough for most of the casual users.
				</Paragraph>
			</Box>
		</>
	);
};

export default Home;
