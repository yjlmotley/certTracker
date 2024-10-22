const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || null,
			token: sessionStorage.getItem("token"),
			allCourses: [],
			courses: [],
			certifications: [],
			message: null,  // Optional: use for setting error/success messages
		},
		actions: {
			// -------------------------- authorization --------------------------
			// -------------------------- authorization --------------------------
			checkFieldAvailability: async (field, value) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/check-availability", {
						method: "POST",
						headers: { "Content-Type": "application/json " },
						body: JSON.stringify({ field, value }),
					});
					const data = await response.json();
					return data.isAvailable;
				} catch (error) {
					console.error("Error checking field availability:", error);
					throw error;
				}
			},

			signUp: async (newUser) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: newUser.email.toLowerCase(),
							password: newUser.password,
							first_name: newUser.firstName,
							last_name: newUser.lastName,
							username: newUser.username.toLowerCase(),
						}),
					})
					console.log("response from signup:", response)
					const data = await response.json();
					if (!response.ok) {
						alert(data.message);
						return false
					};
					console.log(data);
					return true;
				} catch (error) {
					// console.error("please try again later", error);
					throw error
				}

			},

			login: async (loginIdentifier, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify({
							loginIdentifier: loginIdentifier.toLowerCase(),
							password: password
						}),
						headers: { "Content-Type": "application/json" }
					})
					const data = await response.json();
					if (response.status !== 200) {
						alert(data.message);
						return false
					};

					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("currentUser", JSON.stringify(data.user));
					console.log("storing user data into store.currentUser after login:", data.user);
					setStore({ currentUser: data.user, token: data.token });
					return true;
				} catch (error) {
					console.error("please try again later", error);
					throw error;
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("currentUser");
				setStore({ currentUser: null, token: null });
			},

			// -------------------------- courses --------------------------
			// -------------------------- courses --------------------------
			getAllCourses: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/all-courses`);
					const data = await resp.json();
					setStore({ allCourses: data })
					console.log("courses set in store:", data);
				} catch (error) {
					console.error("Error fetching courses:", error);
				}
			},

			getCourses: async (username) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/${username}/courses`);
					const data = await resp.json();
					// if (!resp.ok) {
					// 	throw new Error(data.error || 'Failed to fetch user courses');
					// }
					setStore({ courses: data });
					console.log("courses set in store:", data);
					// return data;
				} catch (error) {
					console.error("Error fetching courses:", error);
					throw error;
				}
			},

			addCourses: async (courseData) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/courses`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${getStore().token}`
						},
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
							Authorization: `Bearer ${getStore().token}`
						},
						body: JSON.stringify(updatedCourseData),
					});
					if (!response.ok) throw new Error('Failed to update course');
					const updatedCourse = await response.json();

					// Update the courses array in the store
					const courses = getStore().courses;
					const updatedCourses = courses.map(course =>
						course.id === courseId ? updatedCourse : course
					);
					setStore({ courses: updatedCourses });

					return updatedCourse;
				} catch (error) {
					console.error("Error updating course:", error);
				}
			},

			deleteCourses: async (courseIds) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/courses/${courseIds}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${getStore().token}`
						},
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

			reorderCourses: (dragIndex, hoverIndex) => {
				const courses = [...getStore().courses];
				const draggedCourse = courses[dragIndex];
				courses.splice(dragIndex, 1);
				courses.splice(hoverIndex, 0, draggedCourse);
				setStore({ courses });
				getActions().updateCoursesOrder(courses);
			},

			updateCoursesOrder: async (courses) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/courses/reorder`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(courses.map((course, index) => ({ id: course.id, order: index })))
					});
					if (!resp.ok) throw new Error('Failed to update course order');
				} catch (error) {
					console.error("Error updating course order:", error);
				}
			},
		}
	};
};

export default getState;
