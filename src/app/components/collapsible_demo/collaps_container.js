import React from 'react';
import image from '../../images/expand-vertical-4.svg';

import Collapsible from './collapsible';
import '../../styles/basic_demos.scss';
import '../../styles/collapsible_demo.scss';

export class CollapsibleContainer extends React.Component {
	render() {
		return (
			<div>
				<header>
					<img src={image} />
					<h1>Collapsible Content</h1>
				</header>
				<div className="content">
					<div id="accordion" role="tablist" aria-multiselectable="true">
						<Collapsible title="Title 1" collapsibleShow={true}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit minima hic dolore, ut odit unde voluptatum, officia aperiam dignissimos ex neque facere quidem labore saepe quisquam repellat, deleniti modi tempore culpa. Accusantium numquam exercitationem maxime neque, provident ratione, ut eius ducimus labore odio aliquid! Voluptas atque, ab magni tempore sed repellat accusamus molestias! Nostrum dignissimos officia reiciendis rem nihil dolor ipsa, iste minus minima atque magni quisquam quos, ullam quidem adipisci aperiam! Tempora est beatae nostrum voluptates debitis numquam molestiae dolores aspernatur, veritatis eos, reiciendis quos architecto in aliquid dolorum provident odio earum. Velit, eligendi exercitationem, quo in veritatis nihil.
						</Collapsible>
						<Collapsible title="Title 2" collapsibleShow={true}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero odio iste, sunt dignissimos dolorum similique alias unde veritatis aliquam dolor aliquid, eligendi dolorem impedit, modi neque eaque. Amet rem, temporibus.
						</Collapsible>
						<Collapsible title="Title 2" collapsibleShow={true}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae voluptas, et quas fuga consequatur enim qui, adipisci quos odit ipsum nam placeat. Vero, ab tenetur porro neque molestias soluta delectus.
						</Collapsible>
					</div>
				</div>
			</div>
		);
	}
}
