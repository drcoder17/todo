<template>
	<div id="app" class="relative">
		<Navbar />
		<div class="container xs:container mx-auto pt-10 px-4">
			<div
				class="flex items-center bg-green-500 border-2 rounded-md mb-5 p-6 shadow-lg"
				v-for="todo in allTodos"
				:key="todo.id"
			>
				<input
					class="w-8 mr-7 p-5 hover: cursor-pointer"
					@change="task(todo.id)"
					type="checkbox"
					:checked="todo.completed"
				/>
				<span
					class="flex-1 font-mono"
					:class="{
						'line-through': todo.completed,
						'text-gray-500': todo.completed,
					}"
				>
					{{ todo.title | upp }}
				</span>
				<span
					class="
						fas fa-trash
						p-2 shadow-md
						bg-gray-300 rounded
						hover:bg-gray-400
						hover: cursor-pointer"
					@click="delTodo(todo.id)"
				></span>
				<!-- // TODO delete todo method -->
			</div>
		</div>
		<div class="box flex justify-center mb-5">
			<button
				class="font-mono rounded p-2 text-black shadow-md bg-green-500"
				:disabled="currentPage <= 0"
				@click="currentPage -= 1"
			>
				Prev
			</button>
			<span class="font-bold pt-5 mx-3"></span>
			<button
				class="font-mono rounded p-2 text-black shadow-md bg-green-500"
				@click="currentPage += 1"
				:disabled="currentPage >= length"
			>
				Next
			</button>
		</div>
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import axios from 'axios';
export default {
	name: 'Home',
	components: {
		Navbar,
	},
	data() {
		return {
			url: 'https://jsonplaceholder.typicode.com/todos',
			todos: [],
			currentPage: 0,
			length: 0,
			eachPage: 7,
		};
	},
	async mounted() {
		const { data } = await axios.get(this.url);
		if (data.length % this.eachPage === 0) {
			this.length = Math.floor(data.length / this.eachPage) - 1;
		} else {
			this.length = Math.floor(data.length / this.eachPage);
		}
		if (data) {
			this.todos = data;
		}
	},
	computed: {
		allTodos() {
			let start = this.currentPage * this.eachPage;
			let end = start + this.eachPage;
			return this.todos.slice(start, end);
		},
	},
	methods: {
		task(id) {
			this.todos.map(t => {
				if (t.id === id) {
					t.completed = !t.completed;
				}
			});
		},
		delTodo(id) {
			this.todos = this.todos.filter(todo => todo.id !== id);
		},
	},
	filters: {
		upp: title => {
			if (title.length > 30) {
				return title.slice(0, 30).toUpperCase() + '...';
			}
			return title.toUpperCase();
		},
	},
};
</script>
