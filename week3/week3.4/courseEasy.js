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
        req.user = user;
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

let counter = 1;

app.post('/admin/course', adminAuthentication, (req, res) => {
    const course = req.body;
    course.id = counter++;
    COURSE.push(course);
    res.json({ message: "Course created successfully" , courseId: course.id});
});

app.put('/admin/course/:courseId', adminAuthentication, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSE.find(c => c.id === courseId);
    if (course) {
        Object.assign(course, req.body);// this will replace original instance of course that is present in COURSE array
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
    res.json({ courses: COURSE });
});

app.get('/admin/all', (req, res) => {
    res.json(ADMIN);
});
const ctr =1;
app.post('/user/signup', (req, res) => {
    // const user = { ...req.body, purchasedCourses: [] };
    const user = {
        userId : ctr,
        username : req.body.username,
        password: req.body.password,
        purchasedCourses:[]
    }
    USER.push(user);
    res.status(201).json({ message: "User created successfully" });
    ctr= ctr+1;
});
app.post('/user/login', userAuthentication, (req, res) => {
    res.json({message: "user loggedin Successfully"});
})

app.get('/user/courses', userAuthentication, (req, res) =>{
    // COURSE.filter(c => c.published);
    let filteredCourses = [];
    for(let i =0; i< COURSE.length; i++){
        if(COURSE[i].published){
            filteredCourses.push(COURSE[i]);
        }
    }
    res.json({courses : filteredCourses}); // or i can direcly duse the following line without using filteredCourses
    // res.json({courses: COURSE.filter( c => c.published)});
})

app.post('user/courses/:courseId', userAuthentication, (req, res) => {
    const userId = parseInt(req.params.courseId);
    const course = COURSE.find(c => c.id === courseId && c.published);
    if(course){
        //var username = req.headers["username"];
        // find user in GLOBAL User array\
        // update user object
        // remove the old user object to USER global array.
        // add the new user object to the USER global array
        req.user.purchasedCourses.push(courseId);
        res.json({message: "course purchased Successfully"});
    }else{
        res.status(404).json({message: "Course not found or not available"});
    }
});

app.get('/user/purchasedCourses', userAuthentication, (req, res) => {
    // const purchasedCourses = COURSE.filter(c => req.user.purchasedCourses.includes(c.id)); //or use following lines
    // --we need to extract complete course object from COURSE
    // --which have ids which are present in req.user.purchasedCourses
    var purchasedCourseIds = req.user.purchasedCourses;
    var purchasedCourses =[];
    for(let i =0; i< COURSE.length; i++){
        if(purchasedCourseIds.indexOf(COURSE[i].id) !== -1){
            purchasedCourses.push(COURSE[i]);
        }
    }
    res.json({purchasedCourses});
})

app.listen(3003, () => {
    console.log("App is listening at 3003");
});

module.exports = app;
