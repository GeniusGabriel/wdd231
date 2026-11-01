// 1. Responsive Navigation Menu Toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

// 2. Dynamic Footer Dates
// Current Copyright Year
const currentYearSpan = document.querySelector("#currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Last Modified Date
const lastModifiedParagraph = document.querySelector("#lastModified");
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}

// 3. Course List Array and Filtering Logic
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseContainer = document.querySelector('.cert-list');
const filterAllBtn = document.querySelector('#all-btn');
const filterWddBtn = document.querySelector('#wdd-btn');
const filterCseBtn = document.querySelector('#cse-btn');
const totalCreditsEl = document.querySelector('.cert-credits');

// Function to display courses dynamically
function displayCourses(filteredCourses) {
    if (!courseContainer) return;

    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('cert-item');

        // Mark completed courses differently using your accent/completed color styling
        if (course.completed) {
            courseCard.classList.add('completed');
            courseCard.innerHTML = `✓ ${course.subject} ${course.number}`;
        } else {
            courseCard.innerHTML = `${course.subject} ${course.number}`;
        }

        courseContainer.appendChild(courseCard);
    });

    // Calculate and display total credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    if (totalCreditsEl) {
        totalCreditsEl.textContent = `The total credits for courses listed above is ${totalCredits}`;
    }
}

// Initial display of all courses
displayCourses(courses);

// Event Listeners for Filter Buttons (if you assign IDs to them in HTML)
if (filterAllBtn) {
    filterAllBtn.addEventListener('click', () => displayCourses(courses));
}
if (filterWddBtn) {
    filterWddBtn.addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));
}
if (filterCseBtn) {
    filterCseBtn.addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));
}