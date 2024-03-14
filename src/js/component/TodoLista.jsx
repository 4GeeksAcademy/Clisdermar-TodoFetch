import React, { useEffect } from "react";
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const TodoLista = () => {
	const [hover, setHover] = useState(false)
	const [lista, setLista] = useState([{
		"label": "",
		"done": false
	}])



	const ApiFuntion = async () => {
		try {
			const resp = await fetch("https://playground.4geeks.com/apis/fake/todos/user/clisdermar", {
				method: "GET"
			});
			const data = await resp.json();
			console.log(resp)
			setLista(data)

		} catch (error) {
			console.log(`este es el ${error}`);
		}
	}

	useEffect(() => {
		ApiFuntion();
	}, [])

	const agregartarea = async (nuevalista) => {
		try {
			const resp = await fetch("https://playground.4geeks.com/apis/fake/todos/user/clisdermar", {
				method: "PUT",
				body: JSON.stringify(nuevalista),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await resp.json();
			setLista(nuevalista);
		} catch (error) {
			console.log(`este es el ${error}`);
		}
	}

	const borrarTarea = async (ind) => {
		const menosUnaTarea = lista.filter((obj, index) => ind != index)
		try {
			const resp = await fetch("https://playground.4geeks.com/apis/fake/todos/user/clisdermar", {
				method: "PUT",
				body: JSON.stringify(menosUnaTarea),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await resp.json();
			setLista(menosUnaTarea);
		} catch (error) {
			console.log(`este es el ${error}`);
		}
	}



	const deleteReinicio = async () => {
		try {
			const resp = await fetch("https://playground.4geeks.com/apis/fake/todos/user/clisdermar", {
				method: "PUT",
				body: JSON.stringify([lista[0]]),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await resp.json();
		} catch (error) {
			console.log(`este es el ${error}`);
		}
		ApiFuntion();
	}





	return <>
		<h1 className="title text-center mt-5">Todos</h1>
		<Card className="d-flex" body>
			<div className="row m-3">
				<input className="inputEdit col-12" onKeyUp={async (evt) => {
					if (evt.key == 'Enter') {
						const nuevalista = [...lista, { label: evt.target.value, done: false }]
						evt.target.value = ""
						await agregartarea(nuevalista);

					}
				}}
					type="text" placeholder="whats need to be done?" defaultValue={lista.label}
				/>
			</div>


			{lista.map((item, ind) => {
				if (ind > 0) {
					return <div key={ind}>
						{/* <li key={item.label}>{item.label}</li> */}
						<div onMouseEnter={() => setHover(ind)} className="row m-2" >
							<h5 className="col-11 text-secondary" key={item.label}>{item.label}</h5>
							{hover == ind && <button className="botonEdit col-1" onClick={async () => {
								borrarTarea(ind)
							}} >x</button>}
						</div>

					</div>
				}
			})}


			<div>
				<span className="m-5">{lista.length -1} Item left</span>
				<Button className="ms-5" variant="primary" onClick={deleteReinicio} >Delete all</Button>
			</div>
		</Card >

	</>
};

export default TodoLista;