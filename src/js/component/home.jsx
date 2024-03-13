import React from "react";

//include images into your bundle

import TodoLista from "./TodoLista";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<TodoLista/>
		</div>
	);
};

export default Home;
