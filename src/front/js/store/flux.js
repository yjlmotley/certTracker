const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			courses: [],
			message: null,
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
