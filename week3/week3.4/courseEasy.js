const express = require("express");
const app = express();
app.use(express.json());

let ADMIN = [];
let USER = [];
let COURSE = [];

const adminAuthentication = (req, res, next) => {
    const { username, password } = req.headers;
    const admin = ADMIN.find(a => a.username === username && a.password === password);
    if (admin) {
        next();
    } else {
        res.status(403).json({ message: "Admin Authentication failed" });
    }
};

const userAuthentication = (req, res, next) => {
    const { username, password } = req.headers;
    const user = USER.find(u => u.username === username && u.password === password);
    if (user) {
        req.user = user; // adding user object to the request
        next();
    } else {
        res.status(403).json({ message: "User Authentication Failed" });
    }
};

app.post('/admin/signup', (req, res) => {
    const admin = req.body;
    const existingAdmin = ADMIN.find(a => a.username === admin.username);
    if (existingAdmin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        ADMIN.push(admin);
        res.json({ message: 'Admin created successfully' });
    }
});

app.post('/admin/login', adminAuthentication, (req, res) => {
    res.json({ message: 'Logged in Successfully' });
});

app.post('/admin/course', adminAuthentication, (req, res) => {
    const course = req.body;
    course.id = Date.now(); // using timestamp as course id
    COURSE.push(course);
    res.json({ message: 'Course created successfully' });
});

app.put('/admin/course/:courseId', adminAuthentication, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSE.find(c => c.id === courseId);
    if (course) {
        Object.assign(course, req.body);
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
    res.json({ courses: COURSE });
});

app.post('/user/signup', (req, res) => {
    const user = { ...req.body, purchasedCourses: [] };
    USER.push(user);
    res.status(201).json({ message: "User created successfully" });
});

// Optional Debug Route (You can remove this later)
app.get('/admin/all', (req, res) => {
    res.json(ADMIN);
});

app.listen(3003, () => {
    console.log("App is listening at 3003");
});

module.exports = app;
