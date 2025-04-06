//  using jwt web token
const jwt =  require('jsonwebtoken');
const express = require('express')
const app = express();
app.use(express.json());

let ADMIN =[];
let USER = [];
let COURSE = [];

const secretKey = "Krishna@123";//your secret key
const generateJwt = (user) => {
    const payload = {username: user.username};
    return jwt.sign(payload, secretKey, {expiresIn : '1h'});
}

const authenticateJwt = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }else{
        res.sendStatus(401);
    }
    
};

app.post('/admin/signup', (req, res) => {
    const admin = req.body;
    const existingAdmin = ADMIN.find(a => a.username === admin.username )
    if(existingAdmin){
        res.status(403).json({message: "admin already exist"})
    }else{
        ADMIN.push(admin);
        const token = generateJwt(admin);
        res.json({message: "admin created successfully", token});
    }
});

app.post('/admin/login',(req, res) => {
    const {username, password} = req.headers;
    const admin = ADMIN.find(a => a.username === username && a.password === password)
    if(admin){
        const token = generateJwt(admin);
        res.json({message : "Logged in Successfully", token});
    }else{
        res.status(403).json({message: " Login Failed, please try with valid credentials"})
    }
});

app.post('/admin/course', authenticateJwt, (req, res) => {
    const course = req.body;
    COURSE.push({...course, id: COURSE.length + 1});
    res.json({message: " Course created successfully"})
});

app.put('/admin/course/:courseId', authenticateJwt, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const courseIndex = COURSE.findIndex(c => c.id === courseId);
    if(courseIndex > -1){
        const updatedCourse = {...COURSE[courseIndex], ...req.body};
        COURSE[courseIndex] = updatedCourse;
        res.json({message : "Course updated Successfully"})
    }else{
        res.status(403).json({message: "course not found"})
    }
});
app.get('/admin/allcourses', authenticateJwt, (req, res) => {
    res.json(COURSE);
})
app.post('/user/signup',(req, res) => {
    const user = req.body;
    const existingUser = USER.find(u => u.username === user.username);
    if(existingUser){
        res.status(403).json({message:"User already exist"})
    }else{
        USER.push(user);
        const token = generateJwt(user);
        res.json({message: "User created Successfully", token});
    }
});
app.post('/user/login', (req, res) => {
    const {username, password} = req.headers;
    const user = USER.find(u => u.username === username && u.password === password);
    if(user){
        const token = generateJwt(user);
        res.json({message: " Logged in successfully", token});
    }else{
        res.status(403).json({message: "user Authentication failed"})
    }
});

app.get('/user/courses', authenticateJwt, (req, res) => {
    res.json({courses: COURSE});
})

app.post('/user/courses/:courseId', authenticateJwt, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSE.find(c => c.id === courseId);
    if(course){
        const user = COURSE.find(u => u.username === req.user.username);
        if(user){
            if(!user.purchasedCourses){
                user.purchasedCourses =[];
            }
            user.purchasedCourses.push(course);
            res.json({message:"Course Purchased Successfully"})
        }else{
            res.status(403).json({message: "User not found"})
        }
    }else{
        res.status(403).json({message: "Course not found"})
    }
});

app.get('/user/purchasedCourses', authenticateJwt, (req, res) => {
    const user = USER.find(u => u.username === req.user.username);
    if(user && user.purchasedCourses){
        res.json({purchasedCourses : user.purchasedCourses});
    }else{
        res.status(404).json({message: "No Course Purchased"});
    }
});

app.listen(3005, () => {
    console.log("App is listening at 3005");
});

module.exports = app;
