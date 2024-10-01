const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			courses: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getCourses: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/courses`);
					const data = await resp.json();
					setStore({ courses: data })
					console.log("courses set in store:", data);
				} catch (error) {
					console.error("Error fetching courses:", error);
				}
			},
			addCourses: async (courseData) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/courses`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(courseData)
					});
					if (!resp.ok) { throw new Error(`Failed to add course: ${resp.status} - ${resp.statusText}`); }
					const newCourse = await resp.json();
					setStore({ courses: [...getStore().courses, newCourse] });
					// alert("Your course has been successfully added.");
				} catch (error) {
					console.error("Error adding course:", error);
				}
			},
			editCourse: async (courseId, updatedCourseData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/courses/${courseId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedCourseData),
					});
					if (!response.ok) throw new Error('Failed to update course');
					await getActions().getCourses();  // Refresh the courses after editing
				} catch (error) {
					console.error("Error updating course:", error);
				}
			},
			deleteCourses: async (courseIds) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/courses/${courseIds}`, {
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(courseIds)
					});
					if (!resp.ok) { throw new Error(`Failed to delete course: ${resp.status} - ${resp.statusText}`); }
					const deletedCourses = await resp.json();
					setStore({ courses: getStore().courses.filter(course => !deletedCourses.includes(course.id)) });
					alert("Your course has been successfully deleted.")
				} catch (error) {
					console.error("Error deleting course:", error);
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
