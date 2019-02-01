import React, {	Component } from 'react';
import '../../App.css'

export default class AppDragAndDrop extends Component {
	 state = {
	 	 	tasks: [
	 	 		{name:"Learn Angular", category:"wip", bgcolor:"yellow"},
	 	 		{name:"Learn React", category:"wip", bgcolor:"pink"},
	 	 		{name:"Learn Vue", category:"complete", bgcolor:"skyblue"}
	 	 	]
	 	 }
	 onDragStart = (ev, id) => {
	 	console.log("dragstarted", id)
	 	ev.dataTransfer.setData('id', id)
	 }
     dragOver = (ev) => {
     	ev.preventDefault();

     }

     onDrop = (ev, cat) => {
     		let id = ev.dataTransfer.getData('id')

     		let tasks = this.state.tasks.filter((task) => {
     			if(task.name == id) {
     				task.category = cat
     			}

     			return task
     		})

     		this.setState({
     			...this.state,
     			tasks
     		})

     }

	 render(){
	 	 var tasks = {
	 	 	wip: [],
	 	 	complete: []
	 	 }
	 	 
	 	 this.state.tasks.forEach((t) => {
	 	 	tasks[t.category].push(
	 	 		<div key={t.name}
	 	 			 onDragStart = { (e) => this.onDragStart(e, t.name)}
	 	 			 draggable
	 	 			 className = "draggable"
	 	 			 style = {{backgroundColor: t.bgcolor}} >
	 	 			 {t.name}
	 	 	    </div>
	 	 		)
	 	 })

	 	 return (

	 	 		<div className="App">
	 	 			<h2 className="header">Drag & Drop</h2>
	 	 			<div className="wip"
	 	 				 onDragOver= {(e) => this.dragOver(e)}
	 	 				 onDrop = { (e) => this.onDrop(e, 'wip')}>
	 	 				<span className='task-header' > WIP</span>
	 	 				{tasks.wip}
	 	 			</div>
	 	 			<div className='dropable' 
	 	 				 onDragOver={(e) => this.dragOver(e)}
	 	 				 onDrop={ (e) => this.onDrop(e, 'complete') }>
	 	 				<span className='task-header' > Completed</span>
	 	 				{tasks.complete}
	 	 			</div>
	 	 		</div>

	 	 	)
	 }
}